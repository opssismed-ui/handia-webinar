/**
 * HANDIA Her Prime — Webinar Registration Endpoint (v6 — usia bebas + peran)
 *
 * PENYESUAIAN v6:
 * - Umur = input teks bebas (bukan dropdown lagi) — user isi angka sendiri
 * - Kolom baru "Peran" — apakah peserta ikut untuk diri sendiri, mendampingi,
 *   atau tenaga kesehatan
 * - Kolom "Sumber" & "Pertanyaan" tetap ada
 *
 * SETUP:
 * 1. Buka https://script.google.com → project "HANDIA Webinar Endpoint"
 * 2. Hapus semua kode lama, paste isi file ini
 * 3. Pastikan SHEET_ID di bawah sesuai dengan Sheet kamu
 * 4. Save (Ctrl+S)
 * 5. Deploy → Manage deployments → ✏️ pencil icon → New version → Deploy
 *    (URL endpoint tetap sama)
 * 6. Untuk kolom baru muncul otomatis, KOSONGKAN Sheet dulu (hapus semua row)
 *    supaya auto-header regenerate.
 */

const SHEET_ID = 'GANTI_DENGAN_ID_SHEET_KAMU';
const SHEET_NAME = 'Sheet1';

const HEADERS = [
  'Timestamp',
  'Nama',
  'Email',
  'WhatsApp',
  'Usia',
  'Peran',
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
      sheet.setColumnWidth(5, 80);  // Usia
      sheet.setColumnWidth(6, 220); // Peran
      sheet.setColumnWidth(7, 180); // Sumber
      sheet.setColumnWidth(8, 380); // Pertanyaan
    }

    sheet.appendRow([
      new Date(),
      data.nama || '',
      data.email || '',
      data.whatsapp || '',
      data.usia || '',
      data.peran || '',
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
      message: 'HANDIA Her Prime Webinar Endpoint v6'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
