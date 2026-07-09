/**
 * HANDIA Her Prime — Webinar Registration Endpoint (v7 — tanpa kolom Peran)
 *
 * PENYESUAIAN v7:
 * - Field form "Anda mengikuti webinar sebagai" (peran) DIHAPUS
 * - Kolom Sheet: Timestamp | Nama | Email | WhatsApp | Usia | Sumber | Pertanyaan
 * - Usia = angka bebas (input teks di form)
 *
 * CARA UPDATE (WAJIB dilakukan user setelah deploy landing baru):
 * 1. Buka https://script.google.com → project "HANDIA Webinar Endpoint"
 * 2. Hapus semua kode lama, paste seluruh isi file ini
 * 3. Pastikan SHEET_ID di bawah masih sesuai dengan Sheet kamu
 * 4. Save (Ctrl+S)
 * 5. Deploy → Manage deployments → ✏️ pencil icon → Version: New version → Deploy
 *    (URL endpoint TIDAK berubah — tidak perlu ganti apa pun di index.html)
 * 6. KOSONGKAN Sheet dulu (hapus semua baris termasuk header lama) supaya
 *    header baru (tanpa kolom Peran) di-generate otomatis saat submission pertama.
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

    // Auto-generate header kalau Sheet masih kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length)
        .setFontWeight('bold')
        .setBackground('#FBEDF2')
        .setFontColor('#C2447A');
      sheet.setFrozenRows(1);
      sheet.setColumnWidth(1, 160); // Timestamp
      sheet.setColumnWidth(2, 180); // Nama
      sheet.setColumnWidth(3, 220); // Email
      sheet.setColumnWidth(4, 140); // WhatsApp
      sheet.setColumnWidth(5, 80);  // Usia
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
      message: 'HANDIA Her Prime Webinar Endpoint v7'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
