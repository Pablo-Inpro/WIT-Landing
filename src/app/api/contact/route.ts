import { NextResponse } from "next/server";
import { Resend } from "resend";

import { siteConfig } from "@/config/site";

type ContactBody = {
    name?: unknown;
    email?: unknown;
    phone?: unknown;
    message?: unknown;
};

function asTrimmedString(value: unknown) {
    return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function buildContactEmailHtml(input: {
    name: string;
    email: string;
    phone: string;
    message: string;
}) {
    const name = escapeHtml(input.name);
    const email = escapeHtml(input.email);
    const phone = escapeHtml(input.phone || "No indicado");
    const message = escapeHtml(input.message).replaceAll("\n", "<br />");

    return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Solicitud de demostración</title>
  </head>
  <body style="margin:0;padding:0;background:#162426;font-family:Arial,Helvetica,sans-serif;color:#F5F4F0;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#162426;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#1e3032;border:1px solid rgba(92,107,106,0.35);border-radius:12px;overflow:hidden;">
            <tr>
              <td style="padding:24px 28px 8px;border-bottom:1px solid rgba(92,107,106,0.25);">
                <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#C0A153;">WIT · Contacto</p>
                <h1 style="margin:0;font-size:22px;line-height:1.3;font-weight:600;color:#F5F4F0;">Solicitud de demostración</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px;">
                <p style="margin:0 0 18px;font-size:14px;line-height:1.5;color:#a8b3b2;">Has recibido una nueva solicitud desde la landing.</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:14px;line-height:1.5;">
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid rgba(92,107,106,0.25);color:#5C6B6A;width:120px;vertical-align:top;">Nombre</td>
                    <td style="padding:10px 0;border-bottom:1px solid rgba(92,107,106,0.25);color:#F5F4F0;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid rgba(92,107,106,0.25);color:#5C6B6A;vertical-align:top;">Correo</td>
                    <td style="padding:10px 0;border-bottom:1px solid rgba(92,107,106,0.25);">
                      <a href="mailto:${email}" style="color:#C0A153;text-decoration:none;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid rgba(92,107,106,0.25);color:#5C6B6A;vertical-align:top;">Teléfono</td>
                    <td style="padding:10px 0;border-bottom:1px solid rgba(92,107,106,0.25);color:#F5F4F0;">${phone}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;color:#5C6B6A;vertical-align:top;">Comentario</td>
                    <td style="padding:10px 0;color:#F5F4F0;">${message}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px 24px;font-size:12px;line-height:1.4;color:#5C6B6A;">
                Puedes responder a este correo para contactar directamente con el interesado.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(request: Request) {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM_EMAIL;
    const to = siteConfig.contactEmail;

    if (!apiKey || !from || !to) {
        return NextResponse.json(
            { error: "El envío de contacto no está configurado." },
            { status: 503 },
        );
    }

    let body: ContactBody;

    try {
        body = (await request.json()) as ContactBody;
    } catch {
        return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
    }

    const name = asTrimmedString(body.name);
    const email = asTrimmedString(body.email);
    const phone = asTrimmedString(body.phone);
    const message = asTrimmedString(body.message);

    if (!name || name.length > 120) {
        return NextResponse.json(
            { error: "Indica nombre y apellidos." },
            { status: 400 },
        );
    }

    if (!email || email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: "Correo no válido." }, { status: 400 });
    }

    if (phone.length > 40) {
        return NextResponse.json({ error: "Teléfono no válido." }, { status: 400 });
    }

    if (!message || message.length > 2000) {
        return NextResponse.json(
            { error: "Indica un comentario." },
            { status: 400 },
        );
    }

    const resend = new Resend(apiKey);
    const text = [
        `Nombre: ${name}`,
        `Correo: ${email}`,
        `Teléfono: ${phone || "(no indicado)"}`,
        "",
        "Comentario:",
        message,
    ].join("\n");

    const { error } = await resend.emails.send({
        from,
        to: [to],
        replyTo: email,
        subject: `Solicitud de demostración — ${name}`,
        text,
        html: buildContactEmailHtml({ name, email, phone, message }),
    });

    if (error) {
        console.error("[contact]", error);
        return NextResponse.json(
            { error: "No se pudo enviar el mensaje. Inténtalo más tarde." },
            { status: 502 },
        );
    }

    return NextResponse.json({ ok: true });
}