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

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #f5f5f5; padding: 24px; border-radius: 12px;">
        <div style="background: linear-gradient(135deg, #2E55E0, #E8155A); border-radius: 8px; padding: 20px 24px; margin-bottom: 24px;">
          <h2 style="color: #fff; margin: 0; font-size: 20px;">New Lead — Abbas Digital Agency</h2>
          <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 13px;">Someone just filled out your contact form</p>
        </div>
        <div style="background: #fff; border-radius: 8px; padding: 20px 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; width: 110px;">Name</td>
              <td style="padding: 10px 0; color: #111; font-weight: 600;">${lead.name}</td>
            </tr>
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Email</td>
              <td style="padding: 10px 0;"><a href="mailto:${lead.email}" style="color: #2E55E0; text-decoration: none;">${lead.email}</a></td>
            </tr>
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Phone</td>
              <td style="padding: 10px 0; color: #111;">${lead.phone || "—"}</td>
            </tr>
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Service</td>
              <td style="padding: 10px 0; color: #111;">${lead.service || "—"}</td>
            </tr>
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Budget</td>
              <td style="padding: 10px 0; color: #111;">${lead.budget || "—"}</td>
            </tr>
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; color: #111; line-height: 1.6;">${lead.message || "—"}</td>
            </tr>
          </table>
        </div>
        <p style="color: #bbb; font-size: 11px; text-align: center; margin-top: 16px;">
          Sent automatically from abbasdigitalagency.com
        </p>
      </div>
    `

    await transporter.sendMail({
      from: '"Abbas Digital Agency" <noreply@abbasdigitalagency.com>',
      to: "mqaisawan@gmail.com",
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
