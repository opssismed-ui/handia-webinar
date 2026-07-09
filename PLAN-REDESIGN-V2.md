# PLAN — Redesign Landing Page HANDIA Her Prime v2 (Feminine Colorful)

> **Untuk:** Claude Opus (executor). Rancangan oleh Fable, 9 Jul 2026.
> **Cara pakai:** Baca seluruh file ini dulu sampai habis, baru mulai koding. Kerjakan berurutan sesuai bagian "URUTAN EKSEKUSI". Jangan improvisasi di luar spec kecuali disebut "bebas".

---

## 1. KONTEKS

Landing page webinar HANDIA Her Prime ("Tidur Susah, Mood Berantakan, Kolesterol Naik: Apakah Ini Perimenopause?") sudah live di https://handia-webinar.vercel.app. Versi sekarang bergaya "blue medical" — user minta redesign agar **colorful & feminine mengikuti flyer resmi** (`image/handia-her-prime-flyer.png`: soft pink/blush/lavender, headline navy, aksen HANDIA blue), plus perbaikan UX.

**Boleh full rewrite `index.html`** (user explicitly mengizinkan; malah direkomendasikan — lebih bersih daripada patch). Tetap **single-file static HTML/CSS/JS vanilla, tanpa build step, tanpa dependency**.

Versi lama tidak perlu diarsipkan ke folder (git history commit `8107859` sudah cukup; folder `arsip/` hanya untuk perubahan positioning, ini cuma re-skin).

### Permintaan user (semuanya wajib):
1. **Ukuran dikecilkan biar ramah HP** — mobile-first sizing (spec di bagian 5)
2. **Footer dirapikan**: WA HANDIA **085111377736** (bukan Hafizul), IG **handia.id**, semua jadi link. **Hapus nomor & email Hafizul sepenuhnya** dari halaman
3. **Hapus field form "Anda mengikuti webinar sebagai"** (field `peran`) — tidak dipakai
4. **Design colorful & feminine seperti flyer**, tapi aksen HANDIA (biru logo) tidak boleh hilang
5. **Tombol daftar ngambang (floating CTA)** yang selalu terlihat saat scroll
6. **UI/UX dirapikan** secara keseluruhan
7. Flyer sudah tersedia di `image/handia-her-prime-flyer.png` — pakai sebagai hero visual

### Copy tone (SUDAH final di versi sekarang, JANGAN diregresikan):
- Sapaan **"Anda"**, bukan "kamu" — audience perempuan 40+ & keluarganya
- Minim jargon: "rasa panas mendadak" (bukan hot flash), "sulit fokus" (bukan brain fog), "terapi hormon" (bukan HRT/MHT), "jantung berdebar" (bukan palpitasi), "tanya-jawab" (bukan Q&A)
- Tidak menghakimi usia: JANGAN label "perimenopause awal/aktif" pada orang; usia di form = input angka bebas
- Copy pendek & scannable — minat baca panjang rendah
- Positioning ToR: edukasi umum, BUKAN diagnosis/konsultasi personal/endorsement produk — disclaimer wajib tetap ada

---

## 2. ASET & KONSTANTA (jangan salah tulis)

| Item | Nilai |
|---|---|
| Flyer hero | `image/handia-her-prime-flyer.png` (sudah ada, potret ~4:5) |
| Logo | `image/handia-logo.jpg` (kotak, background putih, biru+cyan) |
| Form endpoint (JANGAN HILANG) | `https://script.google.com/macros/s/AKfycbzzQFFkhpul2A4JVy9taVmvKa-1PzGBtRUBe5-zWit79maTnuLrhFEbyfEdeT1KBkrRjg/exec` |
| WA HANDIA | display `0851-1137-7736`, link `https://wa.me/6285111377736` |
| Instagram | display `@handia.id`, link `https://www.instagram.com/handia.id` |
| Production URL | https://handia-webinar.vercel.app |
| Judul publik | Tidur Susah, Mood Berantakan, Kolesterol Naik: Apakah Ini Perimenopause? |
| Tagline (dari flyer, pakai!) | "Perempuan Sehat, Hidup Berkualitas" |
| Speaker | TBA — "Dokter Spesialis Kandungan dan Kebidanan", jangan sebut nama |
| Tanggal/Waktu | TBA · Tempat: Zoom Meeting (Online) · GRATIS |

---

## 3. DESIGN SYSTEM

### 3.1 Palette (ambil dari flyer)
```css
:root{
  /* Feminine dari flyer */
  --pink-deep:#C2447A;      /* accent headline ("Apakah Ini Perimenopause?"), CTA gradient start */
  --pink:#E56B9F;
  --pink-soft:#F6CFDD;
  --blush:#FBEDF2;          /* bg section lembut */
  --lavender:#9B7EC8;       /* CTA gradient end, badge ungu */
  --lavender-soft:#E9DFF5;
  --navy:#232B5C;           /* headings utama (seperti "Tidur Susah..." di flyer) */
  --ink:#3D3852;            /* body text */
  --ink-soft:#6B6580;
  /* Aksen HANDIA (wajib tetap tampil) */
  --handia-blue:#2E7BE0;    /* links, chip Zoom, beberapa ikon */
  --handia-cyan:#19B9DC;    /* chip GRATIS */
  /* Netral */
  --paper:#FFFBFC;
  --white:#FFFFFF;
  --line:rgba(194,68,122,.14);
}
```
- **Gradient primary** (tombol CTA, announce bar, submit): `linear-gradient(135deg, var(--pink-deep) 0%, var(--lavender) 100%)`
- Aksen HANDIA blue dipakai di: logo (gambar asli, jangan di-tint), link teks, chip "Zoom Meeting", 1–2 ikon section, focus ring form boleh pink
- Background halaman: `--paper` dengan blob gradient dekoratif pink/lavender lembut di pojok (via `body::before` radial-gradients, opacity rendah, seperti flyer)

### 3.2 Typography
- Heading: **Cormorant Garamond** (sudah dipakai; serupa dengan "Her Prime" di flyer) — weight 500–600
- Body/UI: **Inter Tight** — weight 300–600
- Google Fonts link sama seperti versi sekarang
- H1 hero: navy, dengan baris accent `serif italic` warna `--pink-deep` (meniru hirarki flyer: judul navy + subjudul pink)

### 3.3 Bentuk & efek
- Radius: card 16px, chip/button 50px (pill), input 10px
- Shadow lembut pink-tinted: `0 20px 50px rgba(194,68,122,.10)` (bukan abu-abu)
- Hover card: translateY(-4px) + border pink
- Scroll reveal: pertahankan pattern `[data-reveal]` + IntersectionObserver dari versi sekarang
- Ornamen: boleh tambah SVG daun/bunga line-art tipis (seperti flyer) sebagai dekorasi section — opacity ≤ .35, jangan ramai. Bebas, opsional.

---

## 4. STRUKTUR HALAMAN (urutan section)

Full rewrite mengikuti urutan ini. Copy per section: **pakai copy dari versi sekarang** (sudah lolos copy-audit) kecuali disebut "baru".

1. **Announce bar** (sticky top, z-101) — gradient pink→lavender, teks putih:
   `Kuota terbatas — daftar gratis sekarang →` (link ke `#daftar`). Tipis: padding ±.5rem, font ≤.8rem.
2. **Nav** (fixed di bawah announce bar) — logo asli (`image/handia-logo.jpg` + wordmark "HANDIA / Handy Healthcare") kiri; kanan tombol pill "Daftar Gratis →" gradient pink→lavender.
3. **Hero** — 2 kolom desktop (teks kiri, flyer kanan); mobile 1 kolom **teks + CTA dulu, flyer di bawahnya** (JANGAN `order:-1`; konversi lebih penting daripada visual di mobile).
   - Eyebrow badge: `✿ Webinar HER PRIME · Perempuan Sehat, Hidup Berkualitas` (pink soft bg)
   - H1: `Tidur Susah, Mood Berantakan, Kolesterol Naik:` (navy) + accent line `Apakah ini perimenopause?` (pink-deep, serif italic)
   - Sub (copy sekarang): "Kenali tanda perimenopause yang sering terlewat dan langkah tepat menjaga kesehatan Anda. Disampaikan dokter spesialis obgyn dalam bahasa yang mudah dipahami."
   - **Meta chips ala flyer** (3 chip pill berwarna): `📅 Tanggal: TBA` (pink) · `🎥 Zoom Meeting` (handia-blue) · `🎁 GRATIS` (handia-cyan). Chip = bg soft + ikon SVG inline sederhana.
   - CTA: `Daftar Sekarang, Gratis →`
   - Flyer image: card rounded 16px + shadow pink; `onerror` fallback boleh dipertahankan.
4. **Manfaat** *(section baru — ambil 4 poin persis dari flyer)*, judul: `Manfaat mengikuti webinar ini`. 4 card kecil ber-ikon (ikon lingkaran warna selang-seling pink/lavender/handia-blue):
   1. Memahami tanda dan gejala perimenopause
   2. Mengetahui pengaruh hormon terhadap mood, tidur, dan metabolik
   3. Mendapatkan tips menjaga kualitas hidup
   4. Sesi tanya jawab bersama dokter
5. **Untuk Siapa** — 4 card copy versi sekarang ("Baru merasakan perubahan / Sudah aktif mengalami gejala / Sudah memasuki menopause / Mendampingi orang terdekat"). Bg section: `--blush`.
6. **Materi (compact)** — 6 topik versi sekarang, tapi **ringkas**: list 2 kolom desktop / 1 kolom mobile, tiap item = nomor serif + judul + 1 kalimat. Jangan card besar; hemat tinggi halaman.
7. **Mitos vs Fakta** — 4 card mitos versi sekarang (badge "Mitos" merah muda).
8. **Rundown** — timeline 6 item versi sekarang; garis timeline gradient pink→lavender.
9. **Speaker TBA** — compact: avatar ikon dokter (bg lavender-soft), badge `Narasumber`, `Dokter Spesialis Kandungan dan Kebidanan`, note "Nama, foto, dan profil lengkap dokter akan diumumkan menjelang acara". Bg section `--lavender-soft` muda.
10. **Disclaimer** — card copy sekarang persis ("Ini edukasi umum — bukan diagnosis atau konsultasi personal...").
11. **Form pendaftaran** (`id="daftar"`) — lihat bagian 6.
12. **Footer** — lihat bagian 7.
13. **Floating CTA** — lihat bagian 8.
14. **Success modal** — pertahankan dari versi sekarang (checkmark animasi, share WA); ganti warna ke skema pink/lavender; teks share sudah benar (jangan diubah).

---

## 5. MOBILE-FIRST SIZING (permintaan "kecilin biar ramah HP")

Terapkan nilai konkret ini:

- `html{font-size:16px}` desktop; `@media(max-width:480px){html{font-size:15px}}`
- Hero H1: `clamp(1.9rem, 6.5vw, 4rem)`; accent line `~.7em` dari H1
- Body/sub: max `1rem` mobile
- Section padding: desktop `5rem 3rem`; ≤960px `3rem 1.25rem`; ≤480px `2.5rem 1rem`
- Announce bar ≤480px: font `.7rem`, padding `.4rem .6rem`
- Nav ≤480px: logo wordmark `1.1rem`, tombol `.65rem` padding `.55rem 1rem`
- Chip meta hero: wrap, font `.75rem` mobile
- Card padding mobile: `1.4rem 1.2rem`
- Flyer di mobile: `max-width:340px`, margin auto
- Form input: `font-size:16px` di mobile (**wajib — cegah auto-zoom iOS**), padding `.9rem 1rem`
- Floating CTA mobile: lihat bagian 8
- Uji di 375px dan 320px: tidak boleh ada horizontal scroll

---

## 6. FORM (perubahan penting)

Field final (urutan): 
1. `nama` — text, required, placeholder `Contoh: Sri Utami`
2. `email` — email, required + validasi inline (pertahankan regex & pesan error versi sekarang)
3. `whatsapp` — tel, required + validasi inline format 08xx/+62 (pertahankan)
4. `usia` — **text input angka bebas** (inputmode="numeric", pattern) — pertahankan versi sekarang, hint "Isi dengan angka — misalnya 47"
5. ~~`peran`~~ — **HAPUS SELURUHNYA** (dropdown "Anda mengikuti webinar sebagai")
6. `sumber` — dropdown "Dari mana Anda tahu webinar ini?" (opsional) — pertahankan opsi sekarang
7. `pertanyaan` — textarea opsional "Pertanyaan untuk Dokter", hint anonim — pertahankan

Logika JS yang WAJIB dipertahankan dari versi sekarang (copy-paste boleh):
- `FORM_ENDPOINT` konstanta (URL di bagian 2)
- `isValidEmail`, `isValidWhatsApp`, `setFieldError`, `setupFieldValidation` (blur + input listener)
- `handleSubmit`: fetch POST `mode:'no-cors'`, header `text/plain;charset=utf-8`, body JSON; tombol state Mengirim…/Berhasil ✓/error; scroll+focus ke field invalid
- `showSuccessModal` / `closeSuccessModal` / ESC-to-close
- Scroll reveal observer

### Apps Script v7 (`apps-script.gs`)
Tulis ulang file dengan HEADERS **tanpa Peran**:
`['Timestamp','Nama','Email','WhatsApp','Usia','Sumber','Pertanyaan']`
- appendRow menyesuaikan (hapus `data.peran`)
- Sisanya (auto-header + styling header biru→ganti pink `#FBEDF2` bg / `#C2447A` font, frozen row, doGet versi "v7") ikuti pola v6 yang ada
- Di komentar atas file: instruksi user untuk paste ke script.google.com → Manage deployments → New version → Deploy, dan **kosongkan Sheet dulu** supaya header regenerate

---

## 7. FOOTER (rapikan, kontak HANDIA)

Konten:
- Logo HANDIA (img asli dalam kotak putih rounded) + wordmark
- Tagline: `Perempuan Sehat, Hidup Berkualitas` (serif italic, pink-soft di bg navy)
- **Baris kontak — semua link, ada ikon SVG inline kecil:**
  - WhatsApp: `0851-1137-7736` → `https://wa.me/6285111377736`
  - Instagram: `@handia.id` → `https://www.instagram.com/handia.id` (target _blank rel noopener)
- Copyright: `© 2026 HANDIA · Handy Healthcare · All Rights Reserved`
- **DILARANG:** nama/nomor/email Hafizul di manapun di halaman. Grep untuk memastikan: `hafizul`, `6285157755689`, `hafizulaswad02` harus 0 match.

Bg footer: `--navy` (bukan hitam), teks pink-soft/lavender-soft. Mobile: kontak stack vertikal center.

---

## 8. FLOATING CTA ("daftar ngambang")

Spec:
- Elemen: `<a href="#daftar" class="fab-daftar">Daftar Gratis →</a>` (satu elemen, styling pill)
- Style: gradient pink→lavender, teks putih `.78rem` uppercase letter-spacing, padding `1rem 1.6rem`, radius 50px, shadow `0 12px 32px rgba(194,68,122,.35)`, `z-index:900` (modal = 1000)
- Posisi desktop: `position:fixed; right:24px; bottom:24px`
- Posisi mobile (≤600px): `left:50%; transform:translateX(-50%); bottom:16px; width:auto; white-space:nowrap` — pill center bawah
- **Behavior (JS, IntersectionObserver):**
  - Default hidden (translateY(80px) + opacity 0, transition .35s)
  - MUNCUL setelah user scroll melewati hero (misal `window.scrollY > 500` via scroll listener throttled, atau observer pada hero)
  - SEMBUNYI saat section `#daftar` masuk viewport (observer threshold .1) — jangan menutupi form yang sedang diisi
  - Muncul lagi kalau user scroll balik ke atas melewati form
- Hover: translateY(-3px) scale sedikit

---

## 9. META / SEO

- `<title>` tetap; `theme-color` ganti `#C2447A`
- `og:image` tetap `https://handia-webinar.vercel.app/image/handia-her-prime-flyer.png` (flyer asli — bagus untuk share WA)
- Favicon: ganti SVG inline jadi huruf H dengan bg gradient pink→lavender (atau biarkan biru HANDIA — bebas, pilih satu)

---

## 10. URUTAN EKSEKUSI (ikuti persis)

1. `git pull` dulu (pastikan up to date; branch `master`)
2. Baca `index.html` sekarang **sekali penuh** — untuk menyalin: FORM_ENDPOINT, fungsi validasi, handleSubmit, modal, observer, copy text per section
3. Tulis ulang `index.html` sesuai spec bagian 3–9 (satu file utuh)
4. Tulis ulang `apps-script.gs` ke v7 (bagian 6)
5. **Verifikasi lokal via preview tools** (server statis, mis. `npx serve`):
   - Desktop 1280px & mobile 375px screenshot — cek layout, tidak ada horizontal scroll
   - Cek floating CTA muncul saat scroll & hilang di section form
   - Cek `grep -i hafizul index.html` = kosong; `grep peran index.html` = kosong
   - Cek FORM_ENDPOINT masih ada & benar
6. Commit & push:
   ```bash
   git add index.html apps-script.gs PLAN-REDESIGN-V2.md
   git commit -m "Redesign v2: feminine colorful (flyer palette), floating CTA, footer HANDIA (WA+IG), drop field peran, mobile sizing"
   git push
   ```
7. Deploy: `vercel --prod --yes` (project sudah linked: `opssismed-uis-projects/handia-webinar`; kalau error token → minta user `vercel login` akun **opssismed-ui**)
8. Verifikasi production: `curl -s -o /dev/null -w "%{http_code}" https://handia-webinar.vercel.app` = 200
9. Update memory file `C:\Users\akjay\.claude\projects\C--Users-akjay\memory\project_handia_webinar.md`: catat redesign v2 (palette pink/lavender, form tanpa peran, kontak footer WA HANDIA + IG, floating CTA, Apps Script v7)
10. Pindahkan plan ini ke arsip: `git mv PLAN-REDESIGN-V2.md arsip/` + commit kecil (biar root bersih)
11. Laporkan ke user + ingatkan **action manual user**: update Apps Script v7 di script.google.com (paste → Save → Manage deployments → ✏️ → New version → Deploy) dan **kosongkan Sheet** supaya header baru (tanpa Peran) regenerate; lalu test submit dummy

## 11. GUARDRAILS (jangan dilanggar)

- JANGAN ganti/hilangkan FORM_ENDPOINT
- JANGAN memunculkan kembali: nama dokter (Nuri/Yudhis/Rere), "HANDIA × Gayatri", sapaan "kamu", jargon medis mentah, label usia menghakimi, field `peran`, kontak Hafizul
- JANGAN tambah framework/CDN/dependency — tetap vanilla single-file
- JANGAN hapus disclaimer edukasi & form-note kerahasiaan data
- JANGAN ubah copy yang sudah final kecuali diminta spec ini
- Aksen biru HANDIA harus tetap terlihat minimal di: logo, chip Zoom, link footer
- Kalau ragu antara dua pilihan visual → pilih yang lebih dekat ke flyer
