import { NextRequest, NextResponse } from "next/server";
import { holeEmailVorlageById, aktualisiereEmailVorlage, loescheEmailVorlage } from "@/lib/db";
import { getSession } from "@/lib/session";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const session = await getSession();
    if (!session?.isLoggedIn) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const templateId = parseInt(id, 10);

    if (isNaN(templateId)) {
      return NextResponse.json({ success: false, error: "Invalid template ID" }, { status: 400 });
    }

    const vorlage = holeEmailVorlageById(templateId);

    if (!vorlage) {
      return NextResponse.json({ success: false, error: "Template not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      template: {
        id: vorlage.id,
        name: vorlage.name,
        subject: vorlage.betreff,
        body: vorlage.inhalt,
        status: vorlage.status === "Aktiv" ? "Active" : "Draft",
        template_type: vorlage.vorlagen_typ ?? null,
        created_at: vorlage.erstellt_am,
      },
    });
  } catch (error) {
    console.error("❌ Get template error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const session = await getSession();
    if (!session?.isLoggedIn) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const templateId = parseInt(id, 10);

    if (isNaN(templateId)) {
      return NextResponse.json({ success: false, error: "Invalid template ID" }, { status: 400 });
    }

    const existing = holeEmailVorlageById(templateId);
    if (!existing) {
      return NextResponse.json({ success: false, error: "Template not found" }, { status: 404 });
    }

    const { name, subject, body, status, template_type } = await request.json();

    if (!name || !subject || !body) {
      return NextResponse.json({ success: false, error: "name, subject, and body are required" }, { status: 400 });
    }

    const safeStatus = status === "Active" || status === "Draft" ? status : "Draft";

    aktualisiereEmailVorlage(templateId, {
      name,
      betreff: subject,
      inhalt: body,
      status: safeStatus === "Active" ? "Aktiv" : "Entwurf",
      vorlagen_typ: template_type ?? null,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Update template error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const session = await getSession();
    if (!session?.isLoggedIn) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const templateId = parseInt(id, 10);

    if (isNaN(templateId)) {
      return NextResponse.json({ success: false, error: "Invalid template ID" }, { status: 400 });
    }

    const existing = holeEmailVorlageById(templateId);
    if (!existing) {
      return NextResponse.json({ success: false, error: "Template not found" }, { status: 404 });
    }

    loescheEmailVorlage(templateId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Delete template error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
