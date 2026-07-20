/**
 * HANDIA Her Prime — Webinar Registration Endpoint (v8)
 *
 * PERBAIKAN DI v8:
 * 1. ANTI-DOBEL — kalau nomor WhatsApp yang sama daftar lagi, barisnya DIPERBARUI
 *    (bukan nambah baris baru). Orang lain dengan nomor beda tetap bisa daftar normal.
 * 2. NOMOR WA TIDAK HILANG ANGKA 0-nya — kolom WhatsApp dipaksa format TEKS,
 *    jadi "081234567890" tidak berubah jadi 81234567890.
 * 3. ANTI-TABRAKAN — pakai LockService, aman kalau banyak orang daftar bersamaan.
 *
 * CARA UPDATE:
 * 1. Buka https://script.google.com → project "HANDIA Webinar Endpoint"
 * 2. Hapus semua kode lama, paste seluruh isi file ini
 * 3. Pastikan SHEET_ID di bawah masih benar
 * 4. Save (Ctrl+S)
 * 5. Deploy → Manage deployments → ✏️ pencil → Version: New version → Deploy
 *    (URL endpoint TIDAK berubah — tidak perlu ubah apa pun di index.html)
 *
 * CATATAN: baris lama yang nomornya sudah kehilangan angka 0 tidak otomatis
 * diperbaiki. Cara rapikan: blok kolom WhatsApp → Format → Number → Plain text,
 * lalu tambahkan 0 di depan nomor yang kurang. Data baru sudah otomatis benar.
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

const COL_WA = 4; // kolom D

/** Samakan format nomor: 62812.. / 812.. / 0812.. semuanya jadi 0812.. */
function normalisasiNomor(nilai) {
  var s = String(nilai == null ? '' : nilai).replace(/[^0-9]/g, '');
  if (s.indexOf('62') === 0) s = '0' + s.slice(2);
  else if (s && s.charAt(0) !== '0') s = '0' + s;
  return s;
}

function siapkanSheet(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#FBEDF2')
      .setFontColor('#C2447A');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 160);
    sheet.setColumnWidth(2, 180);
    sheet.setColumnWidth(3, 220);
    sheet.setColumnWidth(4, 150);
    sheet.setColumnWidth(5, 80);
    sheet.setColumnWidth(6, 180);
    sheet.setColumnWidth(7, 380);
  }
  // Kolom WhatsApp selalu TEKS supaya angka 0 di depan tidak hilang
  sheet.getRange(1, COL_WA, sheet.getMaxRows(), 1).setNumberFormat('@');
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000); // antre bila ada yang daftar bersamaan
  } catch (errLock) {
    return keluaran({ status: 'error', message: 'Server sibuk, coba lagi' });
  }

  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    siapkanSheet(sheet);

    var waBaru = normalisasiNomor(data.whatsapp);
    var baris = [
      new Date(),
      data.nama || '',
      data.email || '',
      waBaru,                 // sudah rapi & disimpan sebagai teks
      data.usia || '',
      data.sumber || '',
      data.pertanyaan || ''
    ];

    // Cari apakah nomor ini sudah pernah daftar
    var barisDitemukan = -1;
    if (waBaru) {
      var lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        var nomorTerdaftar = sheet.getRange(2, COL_WA, lastRow - 1, 1).getValues();
        for (var i = 0; i < nomorTerdaftar.length; i++) {
          if (normalisasiNomor(nomorTerdaftar[i][0]) === waBaru) {
            barisDitemukan = i + 2; // +2 karena mulai dari baris 2
            break;
          }
        }
      }
    }

    if (barisDitemukan > 0) {
      // Sudah pernah daftar → perbarui datanya, JANGAN tambah baris baru
      sheet.getRange(barisDitemukan, 1, 1, baris.length).setValues([baris]);
      return keluaran({ status: 'ok', mode: 'diperbarui' });
    }

    sheet.appendRow(baris);
    return keluaran({ status: 'ok', mode: 'baru' });

  } catch (err) {
    return keluaran({ status: 'error', message: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return keluaran({
    status: 'ok',
    message: 'HANDIA Her Prime Webinar Endpoint v8'
  });
}

function keluaran(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
