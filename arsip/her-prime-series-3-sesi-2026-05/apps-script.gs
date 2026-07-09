/**
 * HANDIA Her Prime — Webinar Registration Endpoint (v4 — auto-headers)
 *
 * SIMPLIFIED SETUP:
 * 1. Buat Google Sheet baru di akun ops.sismed@gmail.com
 *    Nama: "HANDIA Her Prime - Pendaftaran Webinar"
 *    (TIDAK perlu setup header manual — script akan auto-bikin di submission pertama)
 * 2. Buka https://script.google.com → buka project "HANDIA Webinar Endpoint"
 * 3. Hapus semua kode lama, paste seluruh isi file ini
 * 4. Pastikan SHEET_ID di bawah masih sesuai Sheet kamu
 *    (ID ada di URL Sheet: docs.google.com/spreadsheets/d/[SHEET_ID]/edit)
 * 5. Save (Ctrl+S)
 * 6. Deploy → Manage deployments → ✏️ pencil icon (existing deployment) →
 *    Version: New version → Deploy
 *    (URL endpoint TIDAK berubah — gak perlu ganti di index.html)
 *
 * KENAPA v4 LEBIH BAIK:
 * - Auto-bikin header row pertama kalau Sheet masih kosong
 * - Header otomatis bold + warna beige + freeze row 1
 * - Tahan banting kalau ada field baru di form di masa depan
 * - Gak perlu lagi setup manual setiap kali ada perubahan field
 */

const SHEET_ID = 'GANTI_DENGAN_ID_SHEET_KAMU';
const SHEET_NAME = 'Sheet1';

const HEADERS = [
  'Timestamp',
  'Nama',
  'Email',
  'WhatsApp',
  'Usia',
  'Sesi',
  'Pertanyaan'
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    // Auto-setup header kalau Sheet masih kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length)
        .setFontWeight('bold')
        .setBackground('#F0E9DE')
        .setFontColor('#3A3D38');
      sheet.setFrozenRows(1);
      sheet.setColumnWidth(1, 160); // Timestamp
      sheet.setColumnWidth(2, 180); // Nama
      sheet.setColumnWidth(3, 200); // Email
      sheet.setColumnWidth(4, 140); // WhatsApp
      sheet.setColumnWidth(5, 100); // Usia
      sheet.setColumnWidth(6, 220); // Sesi
      sheet.setColumnWidth(7, 320); // Pertanyaan
    }

    sheet.appendRow([
      new Date(),
      data.nama || '',
      data.email || '',
      data.whatsapp || '',
      data.usia || '',
      data.sesi || '',
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
      message: 'HANDIA Webinar Endpoint v4 — auto-headers active'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
