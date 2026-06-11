# AI 247 — Resources lead backend

Captures resource-download leads (**Name / Business / WhatsApp**), saves them to a
Google Sheet, and sends the guide to the lead on WhatsApp. The PDF also downloads
instantly in the browser, so the page works even before the backend is wired up.

```
Form submit  →  /api/lead  →  ┌─ Google Sheet (lead saved)
                              └─ WhatsApp message (guide link sent)
                Browser      →  instant PDF download
```

## 1. Deploy

**Vercel (easiest):**
1. Push the `leftclick-reference` folder to a Git repo.
2. Import it in Vercel. `api/lead.js` is auto-served at `/api/lead`.
3. Add the env vars below (Project → Settings → Environment Variables).

**Netlify:** rename to `netlify/functions/lead.js`, change the last line to
`exports.handler = async (event) => { ... }` style, and the form posts to
`/.netlify/functions/lead`. (Tell me if you go Netlify and I'll convert it.)

## 2. Google Sheet (lead storage)
1. Create a Google Sheet with headers: `Timestamp | Name | Business | WhatsApp | Guide | Page`
2. Extensions → Apps Script → paste `google-apps-script.gs` → Deploy as **Web app**
   (execute as *Me*, access *Anyone*).
3. Copy the Web-app URL → set as `SHEETS_WEBHOOK_URL`.

## 3. WhatsApp (auto-send the guide)
Uses the **WhatsApp Business Cloud API** (Meta). Because the lead hasn't messaged
you first, the first message must be an **approved template** with 3 variables:
`{{1}}` name, `{{2}}` guide title, `{{3}}` download link.

1. Create a Meta Business app + WhatsApp Business number.
2. Create & get approval for a template, e.g.:
   > Hi {{1}}! Here's your copy of *{{2}}* from AI 247: {{3}}
3. Set the env vars below.

## 4. Environment variables
| Variable | Required | What it is |
|---|---|---|
| `SHEETS_WEBHOOK_URL` | for sheet | Apps Script web-app URL |
| `WHATSAPP_TOKEN` | for WhatsApp | Meta permanent access token |
| `WHATSAPP_PHONE_ID` | for WhatsApp | WhatsApp phone number ID |
| `WHATSAPP_TEMPLATE` | for WhatsApp | Approved template name |
| `WHATSAPP_LANG` | optional | Template language code (default `en`; use `ar` for Arabic) |
| `PUBLIC_BASE_URL` | for WhatsApp | e.g. `https://ai247.sa` (builds full PDF link) |
| `ALLOW_ORIGIN` | optional | CORS origin (default `*`) |

Any integration with missing vars is **skipped gracefully** — the form still
works and the PDF still downloads, so you can ship the page now and switch each
piece on as you set it up.

## 5. Where leads land
All submissions append to your Google Sheet in real time. Migrate to Airtable/
Notion later by swapping the webhook URL — the front-end never changes.
