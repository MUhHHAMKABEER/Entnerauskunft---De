import { NextRequest, NextResponse } from "next/server";
import { erstelleEmailVorlage, listeEmailVorlagen } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.isLoggedIn) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { name, subject, body, status, template_type } = await request.json();

    if (!name || !subject || !body) {
      return NextResponse.json({ success: false, error: "name, subject, body are required" }, { status: 400 });
    }

    const safeStatus = status === "Active" || status === "Draft" ? status : "Draft";

    const result = erstelleEmailVorlage({
      name,
      betreff: subject,
      inhalt: body,
      status: safeStatus === "Active" ? "Aktiv" : "Entwurf",
      vorlagen_typ: template_type ?? null,
    });

    return NextResponse.json({ success: true, id: Number(result.lastInsertRowid) });
  } catch (error) {
    console.error("❌ Create template error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.isLoggedIn) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const vorlagen = listeEmailVorlagen();

    const templates = vorlagen.map((v) => ({
      id: v.id,
      name: v.name,
      subject: v.betreff,
      body: v.inhalt,
      status: v.status === "Aktiv" ? "Active" : "Draft",
      template_type: v.vorlagen_typ,
      created_at: v.erstellt_am,
    }));

    return NextResponse.json({ success: true, data: templates });
  } catch (error) {
    console.error("❌ Error listing email templates:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
