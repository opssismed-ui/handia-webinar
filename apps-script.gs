/**
 * HANDIA Her Prime — Webinar Registration Endpoint (v5 — single webinar)
 *
 * PENYESUAIAN v5:
 * - Ganti kolom "Sesi" → "Sumber" (dari mana peserta tahu webinar)
 * - Kolom "Pertanyaan" tetap (pertanyaan anonim untuk dokter)
 * - Auto-headers tetap aktif
 *
 * SETUP:
 * 1. Buka https://script.google.com → project "HANDIA Webinar Endpoint"
 * 2. Hapus semua kode lama, paste isi file ini
 * 3. Pastikan SHEET_ID di bawah sesuai dengan Sheet kamu
 * 4. Save (Ctrl+S)
 * 5. Deploy → Manage deployments → ✏️ pencil icon → New version → Deploy
 *    (URL endpoint tetap sama)
 * 6. Kalau mau kolom baru kepake langsung, KOSONGKAN Sheet dulu (hapus semua row)
 *    biar auto-header regenerate.
 */

const SHEET_ID = 'GANTI_DENGAN_ID_SHEET_KAMU';
const SHEET_NAME = 'Sheet1';

const HEADERS = [
  'Timestamp',
  'Nama',
  'Email',
  'WhatsApp',
  'Usia',
  'Sumber',
  'Pertanyaan'
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length)
        .setFontWeight('bold')
        .setBackground('#EAF2FC')
        .setFontColor('#1D5CB8');
      sheet.setFrozenRows(1);
      sheet.setColumnWidth(1, 160); // Timestamp
      sheet.setColumnWidth(2, 180); // Nama
      sheet.setColumnWidth(3, 220); // Email
      sheet.setColumnWidth(4, 140); // WhatsApp
      sheet.setColumnWidth(5, 220); // Usia
      sheet.setColumnWidth(6, 180); // Sumber
      sheet.setColumnWidth(7, 380); // Pertanyaan
    }

    sheet.appendRow([
      new Date(),
      data.nama || '',
      data.email || '',
      data.whatsapp || '',
      data.usia || '',
      data.sumber || '',
      data.pertanyaan || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'HANDIA Her Prime Webinar Endpoint v5 — single webinar mode'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
