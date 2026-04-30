/**
 * HANDIA Her Prime — Webinar Registration Endpoint
 *
 * Cara setup:
 * 1. Buat Google Sheet baru di akun ops.sismed@gmail.com
 *    Nama: "HANDIA Her Prime - Pendaftaran Webinar"
 *    Header row 1 (kolom A-G): Timestamp | Nama | Email | WhatsApp | Usia | Topik | IP
 * 2. Buka https://script.google.com → New Project
 * 3. Hapus kode default, paste seluruh isi file ini
 * 4. Ganti SHEET_ID di bawah dengan ID Sheet kamu
 *    (ID ada di URL Sheet: docs.google.com/spreadsheets/d/[SHEET_ID]/edit)
 * 5. Save (Ctrl+S), kasih nama project: "HANDIA Webinar Endpoint"
 * 6. Deploy → New deployment → Type: Web app
 *    - Execute as: Me (ops.sismed@gmail.com)
 *    - Who has access: Anyone
 *    - Klik Deploy
 * 7. Authorize akses (akun ops.sismed@gmail.com)
 * 8. Copy "Web app URL" yang muncul → kasih ke Claude
 */

const SHEET_ID = 'GANTI_DENGAN_ID_SHEET_KAMU';
const SHEET_NAME = 'Sheet1';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    sheet.appendRow([
      new Date(),
      data.nama || '',
      data.email || '',
      data.whatsapp || '',
      data.usia || '',
      data.topik || '',
      ''
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
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'HANDIA Webinar Endpoint is live' }))
    .setMimeType(ContentService.MimeType.JSON);
}
