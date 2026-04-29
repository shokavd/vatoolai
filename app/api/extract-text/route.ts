import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    const fileName = file.name.toLowerCase();
    const buffer = Buffer.from(await file.arrayBuffer());
    let text = "";

    if (fileName.endsWith(".txt")) {
      text = buffer.toString("utf-8");
    } else if (fileName.endsWith(".pdf")) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require("pdf-parse");
      const result = await pdfParse(buffer);
      text = result.text;
    } else if (fileName.endsWith(".docx")) {
      const mammoth = await import("mammoth");
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else {
      return NextResponse.json({ error: "Unsupported file type. Use .txt, .pdf, or .docx" }, { status: 400 });
    }

    text = text.replace(/\n{3,}/g, "\n\n").trim();

    if (!text) {
      return NextResponse.json({ error: "Could not extract text from this file." }, { status: 400 });
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Extract text error:", error);
    return NextResponse.json({ error: "Failed to process file." }, { status: 500 });
  }
}
