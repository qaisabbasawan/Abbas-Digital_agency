import { serve } from "https://deno.land/std@0.177.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

// Where new AI Business Analyzer leads are sent. This is a test address —
// swap it for the production inbox once verified, nothing else needs to change.
const LEAD_RECIPIENT = "info.nabeel.faisal@gmail.com"

const PILLAR_LABELS = {
  branding:        "Branding",
  digitalPresence: "Digital Presence",
  leadGeneration:  "Lead Generation",
  conversion:      "Conversion",
  automation:      "Automation",
  marketing:       "Marketing",
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { lead } = await req.json()
    const labels = lead.optionLabels || {}
    const lookup = (group, val) => (labels[group] && labels[group][val]) || val || "—"

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

    const subject = `New AI Analyzer Lead: ${lead.businessName} — Score ${lead.overall}/100`

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
        <td style="padding:12px 20px;border-top:1px solid #eef0f4;color:#8a8f9c;font:600 11px/1 'Segoe UI',Arial,sans-serif;text-transform:uppercase;letter-spacing:.07em;width:150px;vertical-align:top;white-space:nowrap;">${label}</td>
        <td style="padding:12px 20px;border-top:1px solid #eef0f4;color:#1a1d29;font:400 14px/1.5 'Segoe UI',Arial,sans-serif;">
          ${isLink ? `<a href="mailto:${esc(value)}" style="color:#2E55E0;text-decoration:none;font-weight:600;">${esc(value)}</a>` : esc(value) || "—"}
        </td>
      </tr>`

    const bar = (pillarKey, label) => {
      const val = Math.max(0, Math.min(100, Number(lead.scores?.[pillarKey]) || 0))
      return `
      <tr>
        <td style="padding:6px 20px;color:#1a1d29;font:600 12px/1 'Segoe UI',Arial,sans-serif;width:130px;">${esc(label)}</td>
        <td style="padding:6px 20px 6px 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef0f4;border-radius:6px;">
            <tr><td style="width:${val}%;height:8px;background:linear-gradient(90deg,#2E55E0,#E8155A);border-radius:6px;"></td><td></td></tr>
          </table>
        </td>
        <td style="padding:6px 4px;color:#1a1d29;font:700 12px/1 'Segoe UI',Arial,sans-serif;width:36px;text-align:right;">${val}</td>
      </tr>`
    }

    const answerRow = (label, value) => `
      <tr>
        <td style="padding:9px 20px;color:#8a8f9c;font:600 11px/1.4 'Segoe UI',Arial,sans-serif;text-transform:uppercase;letter-spacing:.06em;width:170px;vertical-align:top;">${esc(label)}</td>
        <td style="padding:9px 20px;color:#1a1d29;font:400 13.5px/1.5 'Segoe UI',Arial,sans-serif;">${esc(value)}</td>
      </tr>`

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f1f5;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f0f1f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 2px 10px rgba(20,20,43,0.06);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#2E55E0,#E8155A);padding:28px 28px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font:700 17px/1.2 'Segoe UI',Arial,sans-serif;color:#ffffff;">Abbas Digital Agency</td>
                  <td align="right">
                    <span style="display:inline-block;background:rgba(255,255,255,0.18);color:#ffffff;font:700 10px/1 'Segoe UI',Arial,sans-serif;letter-spacing:.08em;padding:6px 10px;border-radius:20px;">AI ANALYZER LEAD</span>
                  </td>
                </tr>
              </table>
              <p style="margin:14px 0 0;color:rgba(255,255,255,0.85);font:400 13px/1.5 'Segoe UI',Arial,sans-serif;">
                Someone just completed the AI Business Analyzer — here's their full submission.
              </p>
            </td>
          </tr>

          <!-- Contact details -->
          <tr>
            <td style="padding:8px 8px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${row("Business", lead.businessName)}
                ${row("Email", lead.email, true)}
                ${row("Industry", lead.industry)}
                ${row("Revenue", lookup("revenue", lead.revenue))}
                ${row("Received", receivedAt)}
              </table>
            </td>
          </tr>

          <!-- Overall score -->
          <tr>
            <td style="padding:24px 28px 4px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f8fb;border-radius:10px;">
                <tr>
                  <td style="padding:18px 22px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font:700 28px/1 'Segoe UI',Arial,sans-serif;color:#1a1d29;">${esc(lead.overall)}<span style="font:600 13px 'Segoe UI',Arial,sans-serif;color:#8a8f9c;"> / 100</span></td>
                        <td align="right" style="font:700 12px/1 'Segoe UI',Arial,sans-serif;color:#E8155A;">${esc(lead.stageLabel)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Pillar breakdown -->
          <tr>
            <td style="padding:14px 8px 4px;">
              <p style="margin:8px 20px 4px;color:#8a8f9c;font:600 11px/1 'Segoe UI',Arial,sans-serif;text-transform:uppercase;letter-spacing:.07em;">Score by Pillar</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${bar("branding", PILLAR_LABELS.branding)}
                ${bar("digitalPresence", PILLAR_LABELS.digitalPresence)}
                ${bar("leadGeneration", PILLAR_LABELS.leadGeneration)}
                ${bar("conversion", PILLAR_LABELS.conversion)}
                ${bar("automation", PILLAR_LABELS.automation)}
                ${bar("marketing", PILLAR_LABELS.marketing)}
              </table>
            </td>
          </tr>

          <!-- Full answers -->
          <tr>
            <td style="padding:18px 8px 4px;">
              <p style="margin:8px 20px 4px;color:#8a8f9c;font:600 11px/1 'Segoe UI',Arial,sans-serif;text-transform:uppercase;letter-spacing:.07em;">Full Submission</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${answerRow("Website", lookup("website", lead.website))}
                ${answerRow("Social Media", lookup("socialMedia", lead.socialMedia))}
                ${answerRow("Lead Sources", (lead.leadSources || []).map(v => lookup("leadSources", v)).join(", "))}
                ${answerRow("Lead Capture", lookup("leadCapture", lead.leadCapture))}
                ${answerRow("CRM", lookup("crm", lead.crm))}
                ${answerRow("Email/SMS Automation", lookup("emailSequences", lead.emailSequences))}
                ${answerRow("Paid Advertising", lookup("paidAds", lead.paidAds))}
                ${answerRow("Bottlenecks", (lead.bottlenecks || []).map(v => lookup("bottlenecks", v)).join(", "))}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:24px 28px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:8px;background:linear-gradient(135deg,#2E55E0,#E8155A);">
                    <a href="mailto:${esc(lead.email)}?subject=${encodeURIComponent(`Your Digital Maturity Report — Abbas Digital Agency`)}"
                       style="display:inline-block;padding:12px 22px;color:#ffffff;font:600 13px/1 'Segoe UI',Arial,sans-serif;text-decoration:none;border-radius:8px;">
                      Reply to ${esc(lead.businessName)}
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
                Sent automatically from the AI Business Analyzer at abbasdigitalagency.com/analyzer
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
      to: LEAD_RECIPIENT,
      replyTo: lead.email,
      subject,
      html,
    })

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("Analyzer email error:", err)
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})
