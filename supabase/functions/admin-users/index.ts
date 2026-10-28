// Team management for the admin panel. Runs with the service role, so it is
// the only place admin accounts are created, changed or removed — the
// browser never writes to admin_users or sets anyone's role.
//
// Every request must carry the caller's Supabase session (the client sends it
// automatically via supabase.functions.invoke). Actions:
//   create       { name, email, password, role, status }        Super Admin
//   update       { id, name, role, status, password? }          Super Admin
//   delete       { id }                                         Super Admin
//   update-self  { name }                                       any active admin
//
// Admin rights are stored in auth app_metadata { admin_role, admin_active },
// which RLS policies read from the JWT (see migrations/…secure_admin_access).

import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
// @ts-ignore — npm specifier supported in Supabase Edge Functions
import { createClient } from "npm:@supabase/supabase-js@2.105.4"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

const ROLES = ["Super Admin", "Admin", "Editor", "SEO Manager", "Content Writer", "Analyst", "Viewer"]
const STATUSES = ["Active", "Inactive"]

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } })

const initialsOf = (name: string) =>
  name.split(" ").filter(Boolean).map((n) => n[0]).join("").toUpperCase().slice(0, 2)

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders })

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  // ── who is calling? ────────────────────────────────────────────────────────
  const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "")
  const { data: { user: caller }, error: authErr } = await admin.auth.getUser(token)
  if (authErr || !caller) return json({ error: "Not signed in." }, 401)

  const callerRole = caller.app_metadata?.admin_active ? caller.app_metadata?.admin_role : null
  if (!callerRole) return json({ error: "This account does not have admin access." }, 403)

  let body: Record<string, any>
  try {
    body = await req.json()
  } catch {
    return json({ error: "Invalid request." }, 400)
  }
  const { action } = body

  // ── any admin: update own display name ─────────────────────────────────────
  if (action === "update-self") {
    const name = String(body.name ?? "").trim()
    if (!name) return json({ error: "Name is required." }, 400)
    await admin.auth.admin.updateUserById(caller.id, { user_metadata: { name } })
    const { error } = await admin.from("admin_users")
      .update({ name, initials: initialsOf(name) })
      .eq("auth_user_id", caller.id)
    return error ? json({ error: error.message }, 500) : json({ ok: true })
  }

  // ── everything else: Super Admin only ──────────────────────────────────────
  if (callerRole !== "Super Admin") return json({ error: "Only a Super Admin can manage the team." }, 403)

  const loadRow = async (id: string) => {
    const { data } = await admin.from("admin_users").select("*").eq("id", id).maybeSingle()
    return data
  }

  if (action === "create") {
    const name = String(body.name ?? "").trim()
    const email = String(body.email ?? "").trim().toLowerCase()
    const password = String(body.password ?? "")
    const role = String(body.role ?? "")
    const status = String(body.status ?? "Active")
    if (!name || !email) return json({ error: "Name and email are required." }, 400)
    if (password.length < 10) return json({ error: "Use a password of at least 10 characters." }, 400)
    if (!ROLES.includes(role) || !STATUSES.includes(status)) return json({ error: "Invalid role or status." }, 400)

    const { data: created, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      app_metadata: { admin_role: role, admin_active: status === "Active" },
      user_metadata: { name },
    })
    if (error || !created.user) return json({ error: error?.message ?? "Could not create the account." }, 400)

    // Re-use an existing team row with this email (e.g. from before sign-in moved to Supabase Auth)
    const { data: existing } = await admin.from("admin_users").select("id").ilike("email", email).maybeSingle()
    const row = { name, email, role, status, initials: initialsOf(name), auth_user_id: created.user.id }
    const { error: rowErr } = existing
      ? await admin.from("admin_users").update(row).eq("id", existing.id)
      : await admin.from("admin_users").insert({ id: Date.now().toString(), ...row })
    if (rowErr) {
      await admin.auth.admin.deleteUser(created.user.id)
      return json({ error: rowErr.message }, 500)
    }
    return json({ ok: true })
  }

  if (action === "update") {
    const row = await loadRow(String(body.id ?? ""))
    if (!row) return json({ error: "Team member not found." }, 404)

    const name = String(body.name ?? row.name).trim()
    const role = String(body.role ?? row.role)
    const status = String(body.status ?? row.status)
    const password = body.password ? String(body.password) : ""
    if (!ROLES.includes(role) || !STATUSES.includes(status)) return json({ error: "Invalid role or status." }, 400)
    if (password && password.length < 10) return json({ error: "Use a password of at least 10 characters." }, 400)
    if (row.auth_user_id === caller.id && (role !== "Super Admin" || status !== "Active")) {
      return json({ error: "You can't remove your own Super Admin access." }, 400)
    }

    let authUserId = row.auth_user_id
    const appMeta = { admin_role: role, admin_active: status === "Active" }
    if (authUserId) {
      const { error } = await admin.auth.admin.updateUserById(authUserId, {
        app_metadata: appMeta,
        user_metadata: { name },
        ...(password ? { password } : {}),
        // deactivated accounts can't refresh their session
        ban_duration: status === "Active" ? "none" : "876000h",
      })
      if (error) return json({ error: error.message }, 400)
    } else if (password) {
      // A legacy team row with no login yet: setting a password creates one
      const { data: created, error } = await admin.auth.admin.createUser({
        email: row.email, password, email_confirm: true, app_metadata: appMeta, user_metadata: { name },
      })
      if (error || !created.user) return json({ error: error?.message ?? "Could not create the login." }, 400)
      authUserId = created.user.id
    }

    const { error } = await admin.from("admin_users")
      .update({ name, role, status, initials: initialsOf(name), auth_user_id: authUserId })
      .eq("id", row.id)
    return error ? json({ error: error.message }, 500) : json({ ok: true })
  }

  if (action === "delete") {
    const row = await loadRow(String(body.id ?? ""))
    if (!row) return json({ error: "Team member not found." }, 404)
    if (row.auth_user_id === caller.id) return json({ error: "You can't delete your own account." }, 400)
    if (row.auth_user_id) {
      const { error } = await admin.auth.admin.deleteUser(row.auth_user_id)
      if (error) return json({ error: error.message }, 400)
    }
    const { error } = await admin.from("admin_users").delete().eq("id", row.id)
    return error ? json({ error: error.message }, 500) : json({ ok: true })
  }

  return json({ error: "Unknown action." }, 400)
})
