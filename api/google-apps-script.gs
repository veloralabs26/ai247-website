// ─────────────────────────────────────────────────────────────
// Google Apps Script — turns a Google Sheet into a lead webhook.
// Setup:
//   1. Create a Google Sheet. Row 1 headers:
//      Timestamp | Name | Business | WhatsApp | Guide | Page
//   2. Extensions → Apps Script. Paste this code.
//   3. Deploy → New deployment → type "Web app".
//      Execute as: Me. Who has access: Anyone.
//   4. Copy the Web app URL → set it as SHEETS_WEBHOOK_URL in your
//      serverless env vars.
// ─────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.business || '',
      data.whatsapp || '',
      data.guide || '',
      data.page || ''
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
