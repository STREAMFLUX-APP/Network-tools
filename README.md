# Network Tools — by Streamflux
## Complete Setup Guide

---

## STEP 1 — Create your Supabase database (free, 5 minutes)

1. Go to **supabase.com** → Sign up free
2. Create a new project (name it: network-tools)
3. Go to **SQL Editor** and run this to create your users table:

```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  plan TEXT NOT NULL, -- "marketing", "outreach", "bundle"
  trial_ends_at TIMESTAMP NOT NULL,
  subscribed BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now()
);
```

4. Go to **Settings → API** and copy:
   - **Project URL** → this is your SUPABASE_URL
   - **service_role key** → this is your SUPABASE_SERVICE_KEY

---

## STEP 2 — Upload to GitHub

1. Go to **github.com** → New repository
2. Name it: `network-tools`
3. Drag and drop ALL files keeping the folder structure:
   ```
   vercel.json
   api/auth.js
   api/claude.js
   api/admin.js
   public/index.html
   README.md
   ```
4. Click **Commit changes**

---

## STEP 3 — Deploy on Vercel

1. Go to **vercel.com** → New Project
2. Import your `network-tools` GitHub repository
3. Click **Deploy**

---

## STEP 4 — Add your secret keys (IMPORTANT)

In Vercel → Your Project → **Settings → Environment Variables**, add these 4:

| Name | Value |
|------|-------|
| `ANTHROPIC_API_KEY` | Your Claude API key from console.anthropic.com |
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SERVICE_KEY` | Your Supabase service_role key |
| `ADMIN_SECRET_KEY` | Make up a strong password, e.g. `MySecretAdmin2024!` |

After adding all 4 → click **Redeploy**

---

## STEP 5 — Add your first users (your wife's team)

To add a user, send a POST request to your admin API.
The easiest way is to use a free tool called **Postman** or **Insomnia**.

**OR** — just email me the list of names and emails and I'll give you a simple admin page to add users with one click.

**Add a user example:**
```
POST https://your-app.vercel.app/api/admin
{
  "adminKey": "MySecretAdmin2024!",
  "action": "add_user",
  "name": "Maria Johnson",
  "email": "maria@email.com",
  "password": "Welcome2024!",
  "plan": "bundle",
  "trialDays": 14
}
```

The user gets their email + password → they go to your URL → they log in → they use the app.

---

## YOUR LIVE URL
After deploying: `https://network-tools.vercel.app`
Or your custom subdomain: `monat.streamflux.app`

---

## PLANS
- `marketing` = Marketing Machine only
- `outreach` = Outreach Machine only  
- `bundle` = Both apps

---

## PRICING
- Marketing Machine: $47/month
- Outreach Machine: $47/month
- Bundle: $57/month

---
Built by Streamflux · streamflux.app
