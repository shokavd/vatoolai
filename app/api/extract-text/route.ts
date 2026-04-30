import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const IMAGE_TYPES: Record<string, "image/jpeg" | "image/png" | "image/gif" | "image/webp"> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    const fileName = file.name.toLowerCase();
    const ext = "." + fileName.split(".").pop();
    const buffer = Buffer.from(await file.arrayBuffer());
    let text = "";

    if (ext === ".txt" || ext === ".md") {
      text = buffer.toString("utf-8");

    } else if (ext === ".pdf") {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require("pdf-parse");
      const result = await pdfParse(buffer);
      text = result.text;

    } else if (ext === ".docx") {
      const mammoth = await import("mammoth");
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;

    } else if (ext === ".csv") {
      // Parse CSV into a readable table format
      const raw = buffer.toString("utf-8");
      const rows = raw.split("\n").filter((r) => r.trim());
      text = rows.join("\n");

    } else if (ext === ".xlsx" || ext === ".xls") {
      const XLSX = await import("xlsx");
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const parts: string[] = [];
      for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName];
        const csv = XLSX.utils.sheet_to_csv(sheet);
        parts.push(`Sheet: ${sheetName}\n${csv}`);
      }
      text = parts.join("\n\n");

    } else if (IMAGE_TYPES[ext]) {
      // Use Claude Vision to extract text/content from images
      const base64 = buffer.toString("base64");
      const mediaType = IMAGE_TYPES[ext];
      const response = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 4096,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: { type: "base64", media_type: mediaType, data: base64 },
              },
              {
                type: "text",
                text: "Extract all text from this image exactly as it appears. If there is no text, describe the content clearly and concisely so it can be used as input for further processing. Return only the extracted text or description, no commentary.",
              },
            ],
          },
        ],
      });
      text = response.content[0].type === "text" ? response.content[0].text : "";

    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Use .txt, .pdf, .docx, .csv, .xlsx, .jpg, .png, or .webp" },
        { status: 400 }
      );
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
