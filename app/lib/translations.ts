export type Locale = "en" | "nl" | "es" | "fr" | "de" | "pt";

const freeFeatures = {
  en: ["3 uses per day", "All 11 modes", "All platforms (1 at a time)", "No account needed", "Copy to clipboard"],
  nl: ["3 uses per dag", "Alle 11 modi", "Alle platforms (1 tegelijk)", "Geen account nodig", "Kopieer naar klembord"],
  es: ["3 usos por día", "Los 11 modos", "Todas las plataformas (1 a la vez)", "Sin cuenta", "Copiar al portapapeles"],
  fr: ["3 utilisations par jour", "Les 11 modes", "Toutes les plateformes (1 à la fois)", "Sans compte", "Copier dans le presse-papiers"],
  de: ["3 Nutzungen pro Tag", "Alle 11 Modi", "Alle Plattformen (1 gleichzeitig)", "Kein Konto nötig", "In die Zwischenablage kopieren"],
  pt: ["3 usos por dia", "Todos os 11 modos", "Todas as plataformas (1 de cada vez)", "Sem conta necessária", "Copiar para área de transferência"],
};

const proFeatures = {
  en: ["Unlimited uses", "All 11 modes + Custom", "Multiple platforms at once", "15,000 character input", "History (last 20 results)", "3 variations per request", "Priority processing", "New modes as they launch"],
  nl: ["Onbeperkt gebruik", "Alle 11 modi + Aangepast", "Meerdere platforms tegelijk", "15.000 tekens invoer", "Geschiedenis (laatste 20)", "3 variaties per verzoek", "Prioriteitsverwerking", "Nieuwe modi zodra ze uitkomen"],
  es: ["Usos ilimitados", "11 modos + Personalizado", "Múltiples plataformas a la vez", "15.000 caracteres de entrada", "Historial (últimos 20)", "3 variaciones por solicitud", "Procesamiento prioritario", "Nuevos modos al lanzarse"],
  fr: ["Utilisations illimitées", "11 modes + Personnalisé", "Plusieurs plateformes à la fois", "15 000 caractères en entrée", "Historique (20 derniers résultats)", "3 variations par requête", "Traitement prioritaire", "Nouveaux modes dès leur lancement"],
  de: ["Unbegrenzte Nutzung", "Alle 11 Modi + Benutzerdefiniert", "Mehrere Plattformen gleichzeitig", "15.000 Zeichen Eingabe", "Verlauf (letzte 20 Ergebnisse)", "3 Varianten pro Anfrage", "Vorrangige Verarbeitung", "Neue Modi bei Erscheinen"],
  pt: ["Usos ilimitados", "11 modos + Personalizado", "Várias plataformas ao mesmo tempo", "15.000 caracteres de entrada", "Histórico (últimos 20 resultados)", "3 variações por pedido", "Processamento prioritário", "Novos modos ao lançar"],
};

export const translations = {
  en: {
    nav: { howItWorks: "How it works", pricing: "Pricing", tryFree: "Try Free" },
    hero: {
      badge: "Free · No sign-up needed",
      headline: "Turn any messy text into",
      headlineAccent: "something useful",
      sub: "Paste meeting notes, a brain dump, an email, or any rough text. Clarity AI structures it, summarizes it, and tells you what to do next.",
      cta: "Try it free →",
      ctaSub: "3 free uses per day. No account needed.",
    },
    stats: {
      users: "Users worldwide",
      modes: "AI modes",
      languages: "Output languages",
      free: "Free to start",
    },
    howItWorks: {
      title: "How it works",
      steps: [
        { title: "Paste your text", desc: "Drop in anything — meeting notes, an email, a wall of ideas, a rough draft. No formatting needed." },
        { title: "Pick a mode", desc: "Choose what you need: Meeting Notes, Brain Dump, Email Reply, Cover Letter, Social Media, and more." },
        { title: "Get your result", desc: "Clarity AI returns a structured, ready-to-use output in seconds. Copy it and you're done." },
      ],
    },
    personas: {
      title: "Built for everyone",
      sub: "Whether you're a professional, student, freelancer, or creator — Clarity AI works for you.",
      items: [
        { icon: "💼", title: "Professionals", desc: "Turn messy meeting notes into clean summaries, reply to emails faster, and generate reports in seconds." },
        { icon: "🎨", title: "Freelancers", desc: "Write winning proposals, cover letters, and client communications without staring at a blank page." },
        { icon: "🎓", title: "Students", desc: "Summarize research, clean up drafts, and structure your ideas into clear, well-organized writing." },
        { icon: "📱", title: "Content Creators", desc: "Repurpose any content into posts for LinkedIn, Instagram, TikTok, YouTube, and 5 more platforms." },
      ],
    },
    modes: {
      title: "Eleven modes. One tool.",
      sub: "Works for professionals, students, freelancers, and anyone who deals with text.",
      more: "More coming soon",
      moreDesc: "Report generation, contract summaries, and more — on the way.",
    },
    testimonials: {
      title: "What people are saying",
      sub: "Join thousands of people saving hours every week with Clarity AI.",
      items: [
        { quote: "I used to spend 30 minutes writing meeting follow-ups. Now it takes 30 seconds. Game changer.", name: "Sarah M.", title: "Project Manager" },
        { quote: "As a freelancer, the proposal mode alone is worth the subscription. I win more clients with less effort.", name: "Diego R.", title: "Freelance Designer" },
        { quote: "I write in Dutch but need to send professional emails in English. Clarity AI handles it perfectly.", name: "Anna V.", title: "Marketing Consultant" },
        { quote: "The social media mode is insane. I input one idea and get posts for 9 different platforms instantly.", name: "Marcus K.", title: "Content Creator" },
      ],
    },
    tool: {
      title: "Try it now",
      sub: "No sign-up needed. 3 free uses today.",
    },
    pricing: {
      title: "Simple pricing",
      sub: "Start free. Upgrade when you need more.",
      free: { label: "Free", period: "forever", features: freeFeatures.en, cta: "Start for free" },
      pro: { label: "Pro", period: "per month", badge: "Most popular", features: proFeatures.en, cta: "Get Pro Access →" },
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        { q: "Is it really free?", a: "Yes — 3 uses per day, forever. No credit card, no account needed. Just paste and go." },
        { q: "How does Pro work?", a: "Pro is €9/month and gives you unlimited uses, all 11 modes, multi-platform social media, 15,000 character input, history, and 3 variations per request. Cancel anytime." },
        { q: "Is my text private?", a: "Yes. Your text is sent to the AI to process and immediately discarded. We don't store, log, or train on your content." },
        { q: "What languages can I get output in?", a: "You can get output in 10 languages: English, Dutch, Spanish, French, German, Portuguese, Italian, Polish, Arabic, and Mandarin Chinese." },
        { q: "Does it work on mobile?", a: "Yes — Clarity AI works on any device with a browser. No app download needed." },
        { q: "What if I hit the free limit?", a: "The limit resets every day at midnight. Or upgrade to Pro for unlimited access." },
      ],
    },
    trust: { noStorage: "No data stored", poweredBy: "Powered by Claude AI", cancelAnytime: "Cancel anytime", allDevices: "Works on all devices" },
    footer: { copy: "Clarity AI · vatoolai.com" },
  },

  nl: {
    nav: { howItWorks: "Hoe het werkt", pricing: "Prijzen", tryFree: "Probeer gratis" },
    hero: {
      badge: "Gratis · Geen account nodig",
      headline: "Verander rommelige tekst in",
      headlineAccent: "iets bruikbaars",
      sub: "Plak vergadernotities, een braindump, een e-mail of ruwe tekst. Clarity AI structureert het, vat het samen en vertelt je wat je moet doen.",
      cta: "Probeer gratis →",
      ctaSub: "3 gratis uses per dag. Geen account nodig.",
    },
    stats: { users: "Gebruikers wereldwijd", modes: "AI-modi", languages: "Uitvoertalen", free: "Gratis te starten" },
    howItWorks: {
      title: "Hoe het werkt",
      steps: [
        { title: "Plak je tekst", desc: "Gooi er alles in — vergadernotities, een e-mail, ideeën of een kladversie. Geen opmaak nodig." },
        { title: "Kies een modus", desc: "Kies wat je nodig hebt: Vergadernotities, Braindump, E-mailreactie, Sollicitatiebrief, Social Media en meer." },
        { title: "Ontvang je resultaat", desc: "Clarity AI geeft binnen seconden een gestructureerde output. Kopieer en klaar." },
      ],
    },
    personas: {
      title: "Voor iedereen gemaakt",
      sub: "Of je nu professional, student, freelancer of creator bent — Clarity AI werkt voor jou.",
      items: [
        { icon: "💼", title: "Professionals", desc: "Zet rommelige vergadernotities om in heldere samenvattingen, beantwoord e-mails sneller en genereer rapporten in seconden." },
        { icon: "🎨", title: "Freelancers", desc: "Schrijf winnende voorstellen, sollicitatiebrieven en klantcommunicatie zonder naar een leeg scherm te staren." },
        { icon: "🎓", title: "Studenten", desc: "Vat onderzoek samen, ruim concepten op en structureer je ideeën in heldere, goed georganiseerde tekst." },
        { icon: "📱", title: "Content Creators", desc: "Hergebruik content als posts voor LinkedIn, Instagram, TikTok, YouTube en 5 andere platforms." },
      ],
    },
    modes: {
      title: "Elf modi. Één tool.",
      sub: "Voor professionals, studenten, freelancers en iedereen die met tekst werkt.",
      more: "Meer komt eraan",
      moreDesc: "Rapportgeneratie, contractsamenvattingen en meer — onderweg.",
    },
    testimonials: {
      title: "Wat mensen zeggen",
      sub: "Sluit je aan bij duizenden mensen die wekelijks uren besparen met Clarity AI.",
      items: [
        { quote: "Ik besteedde vroeger 30 minuten aan vergaderverslagen. Nu duurt het 30 seconden. Een echte gamechanger.", name: "Sarah M.", title: "Projectmanager" },
        { quote: "Als freelancer is de voorstelmodule de abonnementskosten alleen al waard. Ik win meer klanten met minder moeite.", name: "Diego R.", title: "Freelance Designer" },
        { quote: "Ik schrijf in het Nederlands maar moet professionele e-mails in het Engels sturen. Clarity AI doet het perfect.", name: "Anna V.", title: "Marketingconsultant" },
        { quote: "De social media-modus is geweldig. Ik voer één idee in en krijg posts voor 9 platforms tegelijk.", name: "Marcus K.", title: "Content Creator" },
      ],
    },
    tool: { title: "Probeer het nu", sub: "Geen account nodig. 3 gratis uses vandaag." },
    pricing: {
      title: "Eenvoudige prijzen",
      sub: "Begin gratis. Upgrade wanneer je meer nodig hebt.",
      free: { label: "Gratis", period: "voor altijd", features: freeFeatures.nl, cta: "Gratis beginnen" },
      pro: { label: "Pro", period: "per maand", badge: "Meest populair", features: proFeatures.nl, cta: "Pro toegang →" },
    },
    faq: {
      title: "Veelgestelde vragen",
      items: [
        { q: "Is het echt gratis?", a: "Ja — 3 uses per dag, voor altijd. Geen creditcard, geen account nodig. Plak en ga." },
        { q: "Hoe werkt Pro?", a: "Pro is €9/maand en geeft je onbeperkt gebruik, alle 11 modi, meerdere platforms, 15.000 tekens invoer, geschiedenis en 3 variaties per verzoek. Annuleer wanneer je wilt." },
        { q: "Is mijn tekst privé?", a: "Ja. Je tekst wordt naar de AI gestuurd voor verwerking en direct weggegooid. We slaan je content niet op." },
        { q: "In welke talen kan ik output krijgen?", a: "Je kunt output krijgen in 10 talen: Engels, Nederlands, Spaans, Frans, Duits, Portugees, Italiaans, Pools, Arabisch en Mandarijn." },
        { q: "Werkt het op mobiel?", a: "Ja — Clarity AI werkt op elk apparaat met een browser. Geen app nodig." },
        { q: "Wat als ik de gratis limiet bereik?", a: "De limiet reset elke dag om middernacht. Of upgrade naar Pro voor onbeperkte toegang." },
      ],
    },
    trust: { noStorage: "Geen data opgeslagen", poweredBy: "Aangedreven door Claude AI", cancelAnytime: "Altijd opzegbaar", allDevices: "Werkt op alle apparaten" },
    footer: { copy: "Clarity AI · vatoolai.com" },
  },

  es: {
    nav: { howItWorks: "Cómo funciona", pricing: "Precios", tryFree: "Prueba gratis" },
    hero: {
      badge: "Gratis · Sin registro",
      headline: "Convierte cualquier texto en",
      headlineAccent: "algo útil",
      sub: "Pega notas de reunión, ideas sueltas, un correo o cualquier texto. Clarity AI lo estructura, resume y te dice qué hacer.",
      cta: "Pruébalo gratis →",
      ctaSub: "3 usos gratis al día. Sin cuenta necesaria.",
    },
    stats: { users: "Usuarios en todo el mundo", modes: "Modos de IA", languages: "Idiomas de salida", free: "Gratis para empezar" },
    howItWorks: {
      title: "Cómo funciona",
      steps: [
        { title: "Pega tu texto", desc: "Pon cualquier cosa — notas de reunión, correos, ideas o un borrador. Sin formato necesario." },
        { title: "Elige un modo", desc: "Elige lo que necesitas: Notas de reunión, Braindump, Respuesta de correo, Carta de presentación, Redes sociales y más." },
        { title: "Obtén tu resultado", desc: "Clarity AI devuelve un resultado estructurado en segundos. Cópialo y listo." },
      ],
    },
    personas: {
      title: "Para todos",
      sub: "Seas profesional, estudiante, freelancer o creador de contenido — Clarity AI funciona para ti.",
      items: [
        { icon: "💼", title: "Profesionales", desc: "Convierte notas caóticas en resúmenes claros, responde correos más rápido y genera informes en segundos." },
        { icon: "🎨", title: "Freelancers", desc: "Escribe propuestas ganadoras, cartas de presentación y comunicaciones con clientes sin quedarte en blanco." },
        { icon: "🎓", title: "Estudiantes", desc: "Resume investigaciones, mejora borradores y estructura tus ideas en escritura clara y bien organizada." },
        { icon: "📱", title: "Creadores", desc: "Convierte cualquier contenido en publicaciones para LinkedIn, Instagram, TikTok, YouTube y 5 plataformas más." },
      ],
    },
    modes: {
      title: "Once modos. Una herramienta.",
      sub: "Para profesionales, estudiantes, freelancers y cualquiera que trabaje con texto.",
      more: "Más próximamente",
      moreDesc: "Generación de informes, resúmenes de contratos y más — en camino.",
    },
    testimonials: {
      title: "Lo que dicen las personas",
      sub: "Únete a miles de personas que ahorran horas cada semana con Clarity AI.",
      items: [
        { quote: "Antes tardaba 30 minutos en escribir el seguimiento de reuniones. Ahora tarda 30 segundos. Un cambio de juego.", name: "Sarah M.", title: "Gerente de Proyectos" },
        { quote: "Como freelancer, el modo de propuestas solo ya vale la suscripción. Gano más clientes con menos esfuerzo.", name: "Diego R.", title: "Diseñador Freelance" },
        { quote: "Escribo en holandés pero necesito enviar correos profesionales en inglés. Clarity AI lo hace perfectamente.", name: "Anna V.", title: "Consultora de Marketing" },
        { quote: "El modo de redes sociales es increíble. Ingreso una idea y obtengo publicaciones para 9 plataformas al instante.", name: "Marcus K.", title: "Creador de Contenido" },
      ],
    },
    tool: { title: "Pruébalo ahora", sub: "Sin registro. 3 usos gratis hoy." },
    pricing: {
      title: "Precios simples",
      sub: "Empieza gratis. Mejora cuando necesites más.",
      free: { label: "Gratis", period: "para siempre", features: freeFeatures.es, cta: "Empezar gratis" },
      pro: { label: "Pro", period: "al mes", badge: "Más popular", features: proFeatures.es, cta: "Obtener acceso Pro →" },
    },
    faq: {
      title: "Preguntas frecuentes",
      items: [
        { q: "¿Es realmente gratis?", a: "Sí — 3 usos al día, para siempre. Sin tarjeta de crédito, sin cuenta. Solo pega y listo." },
        { q: "¿Cómo funciona Pro?", a: "Pro es €9/mes y te da usos ilimitados, los 11 modos, múltiples plataformas, 15.000 caracteres, historial y 3 variaciones por solicitud. Cancela cuando quieras." },
        { q: "¿Es privado mi texto?", a: "Sí. Tu texto se envía a la IA para procesarlo y se descarta inmediatamente. No almacenamos tu contenido." },
        { q: "¿En qué idiomas puedo obtener resultados?", a: "Puedes obtener resultados en 10 idiomas: inglés, holandés, español, francés, alemán, portugués, italiano, polaco, árabe y chino mandarín." },
        { q: "¿Funciona en móvil?", a: "Sí — Clarity AI funciona en cualquier dispositivo con navegador. No se necesita descargar una app." },
        { q: "¿Qué pasa si alcanzo el límite gratis?", a: "El límite se restablece cada día a medianoche. O actualiza a Pro para acceso ilimitado." },
      ],
    },
    trust: { noStorage: "Sin almacenamiento de datos", poweredBy: "Impulsado por Claude AI", cancelAnytime: "Cancela cuando quieras", allDevices: "Funciona en todos los dispositivos" },
    footer: { copy: "Clarity AI · vatoolai.com" },
  },

  fr: {
    nav: { howItWorks: "Fonctionnement", pricing: "Tarifs", tryFree: "Essai gratuit" },
    hero: {
      badge: "Gratuit · Sans inscription",
      headline: "Transformez n'importe quel texte en",
      headlineAccent: "quelque chose d'utile",
      sub: "Collez des notes de réunion, un brainstorming, un e-mail ou tout texte brouillon. Clarity AI le structure, le résume et vous dit quoi faire ensuite.",
      cta: "Essayer gratuitement →",
      ctaSub: "3 utilisations gratuites par jour. Sans compte.",
    },
    stats: { users: "Utilisateurs dans le monde", modes: "Modes IA", languages: "Langues de sortie", free: "Gratuit pour commencer" },
    howItWorks: {
      title: "Fonctionnement",
      steps: [
        { title: "Collez votre texte", desc: "Mettez n'importe quoi — notes de réunion, e-mails, idées ou brouillon. Aucune mise en forme requise." },
        { title: "Choisissez un mode", desc: "Choisissez ce dont vous avez besoin : Notes de réunion, Braindump, Réponse e-mail, Lettre de motivation, Réseaux sociaux et plus." },
        { title: "Obtenez votre résultat", desc: "Clarity AI renvoie un résultat structuré et prêt à l'emploi en quelques secondes. Copiez et c'est fait." },
      ],
    },
    personas: {
      title: "Conçu pour tous",
      sub: "Que vous soyez professionnel, étudiant, freelance ou créateur — Clarity AI fonctionne pour vous.",
      items: [
        { icon: "💼", title: "Professionnels", desc: "Transformez des notes de réunion chaotiques en résumés clairs, répondez aux e-mails plus vite et générez des rapports en secondes." },
        { icon: "🎨", title: "Freelances", desc: "Rédigez des propositions gagnantes, des lettres de motivation et des communications clients sans page blanche." },
        { icon: "🎓", title: "Étudiants", desc: "Résumez des recherches, améliorez des brouillons et structurez vos idées en texte clair et bien organisé." },
        { icon: "📱", title: "Créateurs", desc: "Transformez tout contenu en publications pour LinkedIn, Instagram, TikTok, YouTube et 5 autres plateformes." },
      ],
    },
    modes: {
      title: "Onze modes. Un outil.",
      sub: "Pour les professionnels, étudiants, freelances et tous ceux qui travaillent avec du texte.",
      more: "Plus à venir",
      moreDesc: "Génération de rapports, résumés de contrats et plus — en cours.",
    },
    testimonials: {
      title: "Ce que disent les gens",
      sub: "Rejoignez des milliers de personnes qui économisent des heures chaque semaine avec Clarity AI.",
      items: [
        { quote: "Je passais 30 minutes à rédiger des comptes-rendus de réunion. Maintenant ça prend 30 secondes. Révolutionnaire.", name: "Sarah M.", title: "Chef de Projet" },
        { quote: "En tant que freelance, le mode de proposition vaut à lui seul l'abonnement. Je gagne plus de clients avec moins d'effort.", name: "Diego R.", title: "Designer Freelance" },
        { quote: "J'écris en néerlandais mais dois envoyer des e-mails professionnels en anglais. Clarity AI le fait parfaitement.", name: "Anna V.", title: "Consultante Marketing" },
        { quote: "Le mode réseaux sociaux est incroyable. Je saisis une idée et j'obtiens des posts pour 9 plateformes instantanément.", name: "Marcus K.", title: "Créateur de Contenu" },
      ],
    },
    tool: { title: "Essayez maintenant", sub: "Sans inscription. 3 utilisations gratuites aujourd'hui." },
    pricing: {
      title: "Tarification simple",
      sub: "Commencez gratuitement. Passez à la version supérieure quand vous en avez besoin.",
      free: { label: "Gratuit", period: "pour toujours", features: freeFeatures.fr, cta: "Commencer gratuitement" },
      pro: { label: "Pro", period: "par mois", badge: "Le plus populaire", features: proFeatures.fr, cta: "Accès Pro →" },
    },
    faq: {
      title: "Questions fréquentes",
      items: [
        { q: "Est-ce vraiment gratuit ?", a: "Oui — 3 utilisations par jour, pour toujours. Pas de carte bancaire, pas de compte. Collez et c'est parti." },
        { q: "Comment fonctionne Pro ?", a: "Pro est à 9 €/mois et offre des utilisations illimitées, les 11 modes, plusieurs plateformes, 15 000 caractères, l'historique et 3 variations par requête. Annulez à tout moment." },
        { q: "Mon texte est-il privé ?", a: "Oui. Votre texte est envoyé à l'IA pour traitement et immédiatement supprimé. Nous ne stockons pas votre contenu." },
        { q: "Dans quelles langues puis-je obtenir des résultats ?", a: "Vous pouvez obtenir des résultats en 10 langues : anglais, néerlandais, espagnol, français, allemand, portugais, italien, polonais, arabe et chinois mandarin." },
        { q: "Fonctionne-t-il sur mobile ?", a: "Oui — Clarity AI fonctionne sur tout appareil avec un navigateur. Pas d'application à télécharger." },
        { q: "Que se passe-t-il si j'atteins la limite gratuite ?", a: "La limite se réinitialise chaque jour à minuit. Ou passez à Pro pour un accès illimité." },
      ],
    },
    trust: { noStorage: "Aucune donnée stockée", poweredBy: "Propulsé par Claude AI", cancelAnytime: "Annulation à tout moment", allDevices: "Fonctionne sur tous les appareils" },
    footer: { copy: "Clarity AI · vatoolai.com" },
  },

  de: {
    nav: { howItWorks: "Funktionsweise", pricing: "Preise", tryFree: "Kostenlos testen" },
    hero: {
      badge: "Kostenlos · Keine Anmeldung",
      headline: "Verwandeln Sie jeden Text in",
      headlineAccent: "etwas Nützliches",
      sub: "Fügen Sie Besprechungsnotizen, einen Braindump, eine E-Mail oder beliebigen Text ein. Clarity AI strukturiert, fasst zusammen und sagt Ihnen, was als Nächstes zu tun ist.",
      cta: "Kostenlos ausprobieren →",
      ctaSub: "3 kostenlose Nutzungen pro Tag. Kein Konto erforderlich.",
    },
    stats: { users: "Nutzer weltweit", modes: "KI-Modi", languages: "Ausgabesprachen", free: "Kostenlos starten" },
    howItWorks: {
      title: "Funktionsweise",
      steps: [
        { title: "Text einfügen", desc: "Alles hinein — Besprechungsnotizen, E-Mails, Ideen oder einen Entwurf. Keine Formatierung nötig." },
        { title: "Modus wählen", desc: "Wählen Sie, was Sie brauchen: Besprechungsnotizen, Braindump, E-Mail-Antwort, Anschreiben, Social Media und mehr." },
        { title: "Ergebnis erhalten", desc: "Clarity AI liefert in Sekunden ein strukturiertes, einsatzbereites Ergebnis. Kopieren und fertig." },
      ],
    },
    personas: {
      title: "Für jeden gemacht",
      sub: "Ob Profi, Student, Freelancer oder Creator — Clarity AI funktioniert für Sie.",
      items: [
        { icon: "💼", title: "Profis", desc: "Verwandeln Sie chaotische Notizen in klare Zusammenfassungen, antworten Sie schneller auf E-Mails und erstellen Sie Berichte in Sekunden." },
        { icon: "🎨", title: "Freelancer", desc: "Schreiben Sie überzeugende Angebote, Anschreiben und Kundenkommunikation ohne leere Seite." },
        { icon: "🎓", title: "Studierende", desc: "Fassen Sie Recherchen zusammen, verbessern Sie Entwürfe und strukturieren Sie Ihre Ideen in klaren, gut organisierten Text." },
        { icon: "📱", title: "Creator", desc: "Verwandeln Sie Inhalte in Posts für LinkedIn, Instagram, TikTok, YouTube und 5 weitere Plattformen." },
      ],
    },
    modes: {
      title: "Elf Modi. Ein Tool.",
      sub: "Für Profis, Studierende, Freelancer und alle, die mit Text arbeiten.",
      more: "Mehr kommt bald",
      moreDesc: "Berichtsgenerierung, Vertragszusammenfassungen und mehr — in Kürze.",
    },
    testimonials: {
      title: "Was die Leute sagen",
      sub: "Schließen Sie sich Tausenden an, die wöchentlich Stunden mit Clarity AI sparen.",
      items: [
        { quote: "Früher habe ich 30 Minuten für Meeting-Nachbereitungen gebraucht. Jetzt dauert es 30 Sekunden. Ein Wendepunkt.", name: "Sarah M.", title: "Projektmanagerin" },
        { quote: "Als Freelancer ist der Angebotsmodus allein das Abo wert. Ich gewinne mehr Kunden mit weniger Aufwand.", name: "Diego R.", title: "Freelance Designer" },
        { quote: "Ich schreibe auf Niederländisch, muss aber professionelle E-Mails auf Englisch senden. Clarity AI macht das perfekt.", name: "Anna V.", title: "Marketing-Beraterin" },
        { quote: "Der Social-Media-Modus ist unglaublich. Ich gebe eine Idee ein und bekomme sofort Posts für 9 Plattformen.", name: "Marcus K.", title: "Content Creator" },
      ],
    },
    tool: { title: "Jetzt ausprobieren", sub: "Keine Anmeldung. 3 kostenlose Nutzungen heute." },
    pricing: {
      title: "Einfache Preise",
      sub: "Kostenlos starten. Upgraden wenn Sie mehr brauchen.",
      free: { label: "Kostenlos", period: "für immer", features: freeFeatures.de, cta: "Kostenlos starten" },
      pro: { label: "Pro", period: "pro Monat", badge: "Am beliebtesten", features: proFeatures.de, cta: "Pro-Zugang →" },
    },
    faq: {
      title: "Häufig gestellte Fragen",
      items: [
        { q: "Ist es wirklich kostenlos?", a: "Ja — 3 Nutzungen pro Tag, für immer. Keine Kreditkarte, kein Konto. Einfach einfügen und loslegen." },
        { q: "Wie funktioniert Pro?", a: "Pro kostet 9 €/Monat und bietet unbegrenzte Nutzung, alle 11 Modi, mehrere Plattformen, 15.000 Zeichen, Verlauf und 3 Varianten pro Anfrage. Jederzeit kündbar." },
        { q: "Ist mein Text privat?", a: "Ja. Ihr Text wird zur Verarbeitung an die KI gesendet und sofort gelöscht. Wir speichern Ihre Inhalte nicht." },
        { q: "In welchen Sprachen kann ich Ergebnisse erhalten?", a: "Sie können Ergebnisse in 10 Sprachen erhalten: Englisch, Niederländisch, Spanisch, Französisch, Deutsch, Portugiesisch, Italienisch, Polnisch, Arabisch und Mandarin." },
        { q: "Funktioniert es auf dem Handy?", a: "Ja — Clarity AI funktioniert auf jedem Gerät mit Browser. Keine App erforderlich." },
        { q: "Was passiert, wenn ich das Gratislimit erreiche?", a: "Das Limit wird jeden Abend um Mitternacht zurückgesetzt. Oder upgraden Sie auf Pro für unbegrenzten Zugang." },
      ],
    },
    trust: { noStorage: "Keine Datenspeicherung", poweredBy: "Powered by Claude AI", cancelAnytime: "Jederzeit kündbar", allDevices: "Auf allen Geräten verfügbar" },
    footer: { copy: "Clarity AI · vatoolai.com" },
  },

  pt: {
    nav: { howItWorks: "Como funciona", pricing: "Preços", tryFree: "Experimente grátis" },
    hero: {
      badge: "Grátis · Sem registo",
      headline: "Transforme qualquer texto em",
      headlineAccent: "algo útil",
      sub: "Cole notas de reunião, um braindump, um e-mail ou qualquer texto. Clarity AI estrutura, resume e diz-lhe o que fazer a seguir.",
      cta: "Experimentar grátis →",
      ctaSub: "3 utilizações gratuitas por dia. Sem conta necessária.",
    },
    stats: { users: "Utilizadores em todo o mundo", modes: "Modos de IA", languages: "Idiomas de saída", free: "Grátis para começar" },
    howItWorks: {
      title: "Como funciona",
      steps: [
        { title: "Cole o seu texto", desc: "Coloque qualquer coisa — notas de reunião, e-mails, ideias ou um rascunho. Sem formatação necessária." },
        { title: "Escolha um modo", desc: "Escolha o que precisa: Notas de Reunião, Braindump, Resposta de E-mail, Carta de Apresentação, Redes Sociais e mais." },
        { title: "Obtenha o resultado", desc: "Clarity AI devolve um resultado estruturado em segundos. Copie e pronto." },
      ],
    },
    personas: {
      title: "Feito para todos",
      sub: "Seja profissional, estudante, freelancer ou criador — Clarity AI funciona para si.",
      items: [
        { icon: "💼", title: "Profissionais", desc: "Transforme notas caóticas em resumos claros, responda a e-mails mais rápido e gere relatórios em segundos." },
        { icon: "🎨", title: "Freelancers", desc: "Escreva propostas vencedoras, cartas de apresentação e comunicações com clientes sem página em branco." },
        { icon: "🎓", title: "Estudantes", desc: "Resuma pesquisas, melhore rascunhos e estruture as suas ideias em texto claro e bem organizado." },
        { icon: "📱", title: "Criadores", desc: "Transforme qualquer conteúdo em publicações para LinkedIn, Instagram, TikTok, YouTube e 5 outras plataformas." },
      ],
    },
    modes: {
      title: "Onze modos. Uma ferramenta.",
      sub: "Para profissionais, estudantes, freelancers e qualquer pessoa que trabalhe com texto.",
      more: "Mais em breve",
      moreDesc: "Geração de relatórios, resumos de contratos e mais — a caminho.",
    },
    testimonials: {
      title: "O que as pessoas dizem",
      sub: "Junte-se a milhares de pessoas que poupam horas por semana com Clarity AI.",
      items: [
        { quote: "Costumava demorar 30 minutos a escrever o seguimento de reuniões. Agora demora 30 segundos. Uma revolução.", name: "Sarah M.", title: "Gestora de Projetos" },
        { quote: "Como freelancer, o modo de proposta sozinho já vale a subscrição. Ganho mais clientes com menos esforço.", name: "Diego R.", title: "Designer Freelance" },
        { quote: "Escrevo em holandês mas preciso de enviar e-mails profissionais em inglês. Clarity AI faz isso perfeitamente.", name: "Anna V.", title: "Consultora de Marketing" },
        { quote: "O modo de redes sociais é incrível. Introduzo uma ideia e obtenho publicações para 9 plataformas instantaneamente.", name: "Marcus K.", title: "Criador de Conteúdo" },
      ],
    },
    tool: { title: "Experimente agora", sub: "Sem registo. 3 utilizações gratuitas hoje." },
    pricing: {
      title: "Preços simples",
      sub: "Comece grátis. Melhore quando precisar de mais.",
      free: { label: "Grátis", period: "para sempre", features: freeFeatures.pt, cta: "Começar grátis" },
      pro: { label: "Pro", period: "por mês", badge: "Mais popular", features: proFeatures.pt, cta: "Obter acesso Pro →" },
    },
    faq: {
      title: "Perguntas frequentes",
      items: [
        { q: "É realmente gratuito?", a: "Sim — 3 utilizações por dia, para sempre. Sem cartão de crédito, sem conta. Cole e pronto." },
        { q: "Como funciona o Pro?", a: "Pro é €9/mês e oferece utilizações ilimitadas, todos os 11 modos, múltiplas plataformas, 15.000 caracteres, histórico e 3 variações por pedido. Cancele quando quiser." },
        { q: "O meu texto é privado?", a: "Sim. O seu texto é enviado para a IA para processamento e imediatamente descartado. Não armazenamos o seu conteúdo." },
        { q: "Em que idiomas posso obter resultados?", a: "Pode obter resultados em 10 idiomas: inglês, holandês, espanhol, francês, alemão, português, italiano, polaco, árabe e mandarim." },
        { q: "Funciona no telemóvel?", a: "Sim — Clarity AI funciona em qualquer dispositivo com browser. Sem app para descarregar." },
        { q: "O que acontece se atingir o limite gratuito?", a: "O limite é reposto todos os dias à meia-noite. Ou faça upgrade para Pro para acesso ilimitado." },
      ],
    },
    trust: { noStorage: "Sem armazenamento de dados", poweredBy: "Powered by Claude AI", cancelAnytime: "Cancele quando quiser", allDevices: "Funciona em todos os dispositivos" },
    footer: { copy: "Clarity AI · vatoolai.com" },
  },
};

export type Translations = typeof translations.en;
