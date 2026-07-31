# Bhaasha Seekho — Marketing Site

A conversion-focused marketing/lead-gen site for Bhaasha Seekho (bhaashaseekho.com).
**This is a skeleton/template**: all copy and images are clearly-marked placeholders
(see `content.js`) — swap them in before this goes live for real.

## Tech Stack

- Next.js 14 (App Router, JavaScript/JSX only — no TypeScript)
- Tailwind CSS
- MongoDB Atlas via Mongoose (lead storage)
- Brevo (transactional email, called directly via their REST API)
- Google Tag Manager (GA4 + Google Ads conversion tags get added later, inside the GTM dashboard — not in this code)

## Local Setup

```bash
npm install
cp .env.example .env.local   # fill in real values, see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site builds and runs fine with
`.env.local` empty/missing — Brevo email and MongoDB just won't actually send/save
until real credentials are added (both fail gracefully with a clear error).

## Environment Variables

See [`.env.example`](.env.example) for the full list with comments. Summary:

| Variable | Purpose |
|---|---|
| `MONGODB_URI` / `MONGODB_DB` | Atlas connection string + database name for storing leads |
| `BREVO_API_KEY` / `BREVO_SENDER_EMAIL` | Brevo transactional email |
| `CLIENT_NOTIFICATION_EMAIL` | Inbox that lead/contact notifications go to |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Builds the `wa.me` click-to-chat link |
| `NEXT_PUBLIC_GTM_ID` | GTM container ID — leave blank locally, GTM scripts render nothing until it's set |
| `NEXT_PUBLIC_SITE_URL` | Used in metadata and `sitemap.xml` |

## Content

Every piece of copy on the site lives in [`content.js`](content.js) — nothing else in
the codebase hardcodes marketing text. Bracketed values (`[Course 1 Name]`,
`[Founder Name]`, image labels, etc.) are genuine data slots the client needs to
supply; everything else is normal, readable filler copy meant to be replaced wholesale
once real content is ready.

## Folder Structure

```
app/            pages (App Router) + the two API routes
components/     layout/, home/, courses/, about/, forms/, privacy/, common/
lib/            mongodb.js, brevo.js, utm.js, rateLimit.js, honeypot.js, validation.js
models/         Lead.js (Mongoose schema)
content.js      all page copy
```

## Backend Notes

- `POST /api/leads` — the Register form. Validates input, checks a honeypot field and
  a basic in-memory rate limit, saves the lead to MongoDB (the critical path — fails
  the request if this fails), then sends a Brevo notification email as a best-effort
  step (a failed email doesn't fail the request, since the lead is already saved).
- `POST /api/contact` — the Contact form. Same validation/honeypot/rate-limit guard,
  but Brevo is the only path (no DB save), so a failed send **does** surface an error
  telling the visitor to use WhatsApp instead.
- Rate limiting is a simple per-IP in-memory counter (`lib/rateLimit.js`) — resets on
  serverless cold start, so it's not a hard global limit. Fine for v1; swap for
  Upstash/Redis later if spam becomes a real problem.
- UTM params (`utm_source/medium/campaign`) are captured from the URL on landing and
  stored in `sessionStorage` (`lib/utm.js`) so they survive navigation to whichever
  page the visitor eventually submits a form from.

## Deploying (Vercel)

1. Push to a Git repo, then **Vercel → New Project → Import**.
2. Add all variables from `.env.example` under **Settings → Environment Variables**
   (with real values) for Production.
3. Deploy, confirm the `*.vercel.app` preview works end-to-end.
4. **Settings → Domains** → add `bhaashaseekho.com` + `www` → configure the exact DNS
   records Vercel shows you at that moment at the domain registrar.
5. Update `NEXT_PUBLIC_SITE_URL` to the final domain and redeploy.
6. Hand the live `NEXT_PUBLIC_GTM_ID` to whoever manages Ads/GA4 — tag configuration
   happens inside the GTM dashboard, no code changes needed.

## Still Needed Before Going Live

- Real copy + images throughout (`content.js`)
- Real course list, brand colors/logo
- Brevo API key + verified sender, client's WhatsApp number, GTM container ID
- A MongoDB Atlas connection string for this project
- Legal review of the Privacy Policy page (currently a template)
