import { serve } from "https://deno.land/std@0.177.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { lead } = await req.json()

    const SMTP_PASS = Deno.env.get("SMTP_PASS") ?? ""

    // @ts-ignore — npm specifier supported in Supabase Edge Functions
    const { default: nodemailer } = await import("npm:nodemailer@6.9.9")

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true, // SSL
      auth: {
        user: "noreply@abbasdigitalagency.com",
        pass: SMTP_PASS,
      },
    })

    const subject = `New Lead: ${lead.name} — ${lead.service || "General Inquiry"}`

    const esc = (v) =>
      String(v ?? "").replace(/[&<>"']/g, (c) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
      }[c]))

    const receivedAt = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Karachi",
    })

    const row = (label, value, isLink) => `
      <tr>
        <td style="padding:14px 20px;border-top:1px solid #eef0f4;color:#8a8f9c;font:600 11px/1 'Segoe UI',Arial,sans-serif;text-transform:uppercase;letter-spacing:.07em;width:120px;vertical-align:top;white-space:nowrap;">${label}</td>
        <td style="padding:14px 20px;border-top:1px solid #eef0f4;color:#1a1d29;font:400 14px/1.5 'Segoe UI',Arial,sans-serif;">
          ${isLink ? `<a href="mailto:${esc(value)}" style="color:#2E55E0;text-decoration:none;font-weight:600;">${esc(value)}</a>` : esc(value) || "—"}
        </td>
      </tr>`

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f1f5;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f0f1f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 2px 10px rgba(20,20,43,0.06);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#2E55E0,#E8155A);padding:28px 28px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font:700 17px/1.2 'Segoe UI',Arial,sans-serif;color:#ffffff;">Abbas Digital Agency</td>
                  <td align="right">
                    <span style="display:inline-block;background:rgba(255,255,255,0.18);color:#ffffff;font:700 10px/1 'Segoe UI',Arial,sans-serif;letter-spacing:.08em;padding:6px 10px;border-radius:20px;">NEW LEAD</span>
                  </td>
                </tr>
              </table>
              <p style="margin:14px 0 0;color:rgba(255,255,255,0.85);font:400 13px/1.5 'Segoe UI',Arial,sans-serif;">
                A new contact-form submission just came in — here are the details.
              </p>
            </td>
          </tr>

          <!-- Lead details -->
          <tr>
            <td style="padding:8px 8px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${row("Name", lead.name)}
                ${row("Email", lead.email, true)}
                ${row("Phone", lead.phone)}
                ${row("Service", lead.service)}
                ${row("Budget", lead.budget)}
                ${row("Received", receivedAt)}
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:20px 28px 4px;">
              <p style="margin:0 0 8px;color:#8a8f9c;font:600 11px/1 'Segoe UI',Arial,sans-serif;text-transform:uppercase;letter-spacing:.07em;">Message</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f8fb;border-left:3px solid #2E55E0;border-radius:6px;">
                <tr>
                  <td style="padding:14px 16px;color:#1a1d29;font:400 14px/1.65 'Segoe UI',Arial,sans-serif;">${esc(lead.message) || "—"}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:24px 28px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:8px;background:linear-gradient(135deg,#2E55E0,#E8155A);">
                    <a href="mailto:${esc(lead.email)}?subject=${encodeURIComponent(`Re: Your inquiry to Abbas Digital Agency`)}"
                       style="display:inline-block;padding:12px 22px;color:#ffffff;font:600 13px/1 'Segoe UI',Arial,sans-serif;text-decoration:none;border-radius:8px;">
                      Reply to ${esc(lead.name)}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 28px;background:#f7f8fb;border-top:1px solid #eef0f4;">
              <p style="margin:0;color:#a3a8b5;font:400 11px/1.5 'Segoe UI',Arial,sans-serif;text-align:center;">
                Sent automatically from the contact form at abbasdigitalagency.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

    await transporter.sendMail({
      from: '"Abbas Digital Agency" <noreply@abbasdigitalagency.com>',
      to: "mqaisawan@gmail.com",
      replyTo: lead.email,
      subject,
      html,
    })

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("Email error:", err)
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})
