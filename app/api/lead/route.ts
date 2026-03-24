import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY is not set");
    _resend = new Resend(key);
  }
  return _resend;
}

const TO = process.env.LEAD_RECIPIENT_EMAIL || "contact@iteradvisors.com";
const FROM = "Iter Advisors <leads@crm.iteradvisors.com>";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { source, data } = body;

    if (!source || !data) {
      return NextResponse.json(
        { error: "Missing required fields: source, data" },
        { status: 400 },
      );
    }

    const subject = buildSubject(source, data);
    const text = buildPlainText(source, data);
    const replyTo = data?.email ? [data.email] : undefined;

    const { data: result, error } = await getResend().emails.send({
      from: FROM,
      to: [TO],
      subject,
      text,
      replyTo,
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: "Failed to send email", details: error.message },
        { status: 500 },
      );
    }

    console.log("Email sent:", result?.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

function buildSubject(
  source: string,
  data: Record<string, string>,
): string {
  const name = [data.firstName, data.lastName].filter(Boolean).join(" ");
  const company = data.company || "";
  const who = [name, company].filter(Boolean).join(" — ");

  switch (source) {
    case "contact":
      return `Nouveau message contact — ${who || data.email || "N/A"}`;
    case "profil":
      return `Nouveau lead diagnostic — ${who || data.email || "N/A"}`;
    case "campagne":
      return `Demande de contact campagne — ${who || data.email || "N/A"}`;
    default:
      return `Nouveau lead Iter Advisors — ${data.email || "N/A"}`;
  }
}

function buildPlainText(
  source: string,
  data: Record<string, string>,
): string {
  const date = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const fieldLabels: Record<string, string> = {
    firstName: "Prénom",
    lastName: "Nom",
    company: "Entreprise",
    email: "Email",
    phone: "Téléphone",
    message: "Message",
    stage: "Stade de développement",
    challenge: "Enjeu financier",
    teamSize: "Taille de l'équipe",
    urgency: "Urgence",
  };

  const lines = Object.entries(data)
    .filter(([, v]) => v)
    .map(([k, v]) => `${fieldLabels[k] || k}: ${v}`);

  return [
    `Source: ${source}`,
    `Date: ${date}`,
    "",
    ...lines,
  ].join("\n");
}
