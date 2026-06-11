// ─────────────────────────────────────────────────────────────
// AI 247 — Resource lead capture (serverless function)
// Deploy on Vercel (as /api/lead) or Netlify (see README).
// Flow: form submit -> save to Google Sheet -> WhatsApp the guide.
// All integrations are OPTIONAL via env vars; missing ones are skipped
// so the form/download keeps working while you finish setup.
// ─────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  // Basic CORS (same-origin works without this; handy for testing)
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const { name, business, whatsapp, guide, guideTitle, pdfUrl, page } = body || {};

  if (!name || !business || !whatsapp) {
    return res.status(400).json({ error: 'Missing name, business or whatsapp.' });
  }

  const wa = String(whatsapp).replace(/[^\d+]/g, '');   // e.g. +9665XXXXXXXX
  const waDigits = wa.replace(/^\+/, '');                // Meta API wants digits only
  const results = {};

  // 1) Save the lead to Google Sheets (via an Apps Script web app webhook)
  if (process.env.SHEETS_WEBHOOK_URL) {
    try {
      const r = await fetch(process.env.SHEETS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          name, business, whatsapp: wa,
          guide: guideTitle || guide || '', page: page || ''
        })
      });
      results.sheet = r.ok ? 'ok' : 'error';
    } catch { results.sheet = 'error'; }
  } else { results.sheet = 'skipped (set SHEETS_WEBHOOK_URL)'; }

  // 2) Send the guide on WhatsApp (Meta Cloud API, using an approved template)
  if (process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_ID && process.env.WHATSAPP_TEMPLATE) {
    const base = (process.env.PUBLIC_BASE_URL || '').replace(/\/$/, '');
    const link = pdfUrl
      ? (pdfUrl.startsWith('http') ? pdfUrl : `${base}/${pdfUrl.replace(/^\//, '')}`)
      : base;
    try {
      const r = await fetch(`https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_ID}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: waDigits,
          type: 'template',
          template: {
            name: process.env.WHATSAPP_TEMPLATE,
            language: { code: process.env.WHATSAPP_LANG || 'en' },
            // Your approved template body should have 3 {{ }} variables:
            // {{1}} = name, {{2}} = guide title, {{3}} = download link
            components: [{
              type: 'body',
              parameters: [
                { type: 'text', text: name },
                { type: 'text', text: guideTitle || 'your guide' },
                { type: 'text', text: link }
              ]
            }]
          }
        })
      });
      results.whatsapp = r.ok ? 'ok' : 'error';
      if (!r.ok) results.whatsappDetail = await r.text();
    } catch { results.whatsapp = 'error'; }
  } else { results.whatsapp = 'skipped (set WHATSAPP_* env vars)'; }

  return res.status(200).json({ ok: true, results });
}
