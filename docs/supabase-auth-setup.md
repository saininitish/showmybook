# Sign In / Sign Up not working – Supabase setup

If **Sign in** or **Sign up** doesn’t work (error on submit, or "Failed to fetch"), fix the **API key** and **Auth** settings below.

## 1. Use the correct Supabase anon key

The Supabase JavaScript client (`@supabase/supabase-js`) expects the **anon public** key to be a **JWT** — a long string that starts with `eyJ...`.

- Open your project: [Supabase Dashboard](https://supabase.com/dashboard) → your project.
- Go to **Project Settings** (gear) → **API**.
- Under **Project API keys**, find **anon** **public**.
- Copy the **long key** (it starts with `eyJ...`). That is your anon key.

If your dashboard only shows keys like **Publishable** (`sb_publishable_...`), look for a **Legacy API Keys** or **anon** section on the same API page and use the **anon** key (JWT). The current Supabase JS client works reliably with the anon JWT.

Do **not** use:

- The **service_role** key (secret) — for server-only use; never put it in frontend env.
- A **Publishable** key if the anon JWT is available — use the anon JWT for sign in/sign up with this app.

## 2. Update `.env.local`

Set these in `d:\UI\booking-app\.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...paste_the_long_anon_key_here...
```

- **URL**: Same as in the Supabase Dashboard → Settings → API → **Project URL**.
- **Anon key**: The **anon public** JWT you copied (starts with `eyJ...`).

Save the file, then **restart the dev server** (stop and run `npm run dev` again).

## 3. Check the URL

- `NEXT_PUBLIC_SUPABASE_URL` must be exactly the **Project URL** from the API settings (e.g. `https://mxbmvrhdzkbwkbpcrhpg.supabase.co`).
- No trailing slash.
- Use `https://`.

## 4. SSL / network errors (ERR_CERT_COMMON_NAME_INVALID, connection timeout)

If the console shows **ERR_CERT_COMMON_NAME_INVALID** or **ERR_CONNECTION_TIMED_OUT** when you sign in or sign up:

- **VPN or proxy** — Turn off VPN or try another network. Some VPNs or corporate proxies re-encrypt HTTPS and break Supabase’s certificate.
- **Office or school Wi‑Fi** — Firewalls often do “SSL inspection” and can cause certificate errors. Try **mobile hotspot** or **home Wi‑Fi** to confirm it’s a network issue.
- **Antivirus** — Temporarily disable “HTTPS scanning” or “Web protection” and try again.
- **Supabase status** — Check [status.supabase.com](https://status.supabase.com) and that your project is not **paused** in the Dashboard.

Your `.env.local` URL and anon key are correct; the failure is between your browser and Supabase (network/SSL).

## 5. If it still fails

- Confirm the project is not **paused** (Dashboard → project status).
- Try in an incognito window or another browser.
- Check the browser **Network** tab: do requests to `*.supabase.co` fail (blocked, CORS, or wrong URL)?

After using the **anon JWT**, correct URL, and a network that doesn’t block or alter HTTPS, sign in and sign up should work.
