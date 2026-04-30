# HANDIA × Gayatri — Her Prime Webinar Landing Page

Premium landing page untuk webinar series kesehatan wanita "Her Prime: Menopause Glow-Up Series".

**Live demo:** Akan di-deploy di Vercel  
**Tech stack:** Static HTML + CSS + Vanilla JS (no dependencies)  
**Target:** 100 peserta webinar, responsive mobile + desktop

---

## 🚀 Quick Start

### Prerequisites
- Git installed
- GitHub account
- Vercel account (free, link ke GitHub)

### 1. Clone ini ke lokal kamu
```bash
git clone https://github.com/YOUR-USERNAME/handia-webinar.git
cd handia-webinar
```

### 2. Buka file `index.html` di browser untuk preview
```bash
open index.html
# atau di Windows:
# start index.html
```

### 3. Setup GitHub (pertama kali)

**Sudah ada repo GitHub?** Lanjut ke step 4.

**Belum ada?** Buat repo baru:
1. Pergi ke https://github.com/new
2. Nama repo: `handia-webinar`
3. Private atau Public (rekomendasinya Public untuk Vercel free)
4. Create repository
5. Copy instruksi "…or push an existing repository from the command line"

Jalankan di terminal lokal:
```bash
git init
git add .
git commit -m "Initial commit: HANDIA Her Prime landing page"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/handia-webinar.git
git push -u origin main
```

### 4. Deploy ke Vercel

**Opsi A: Via Vercel CLI (fastest)**
```bash
npm i -g vercel
vercel
# Follow prompts, confirm project setup
```

**Opsi B: Via Vercel Web (no CLI needed)**
1. Buka https://vercel.com
2. Sign up/login dengan GitHub account
3. Klik "New Project"
4. Pilih repo `handia-webinar`
5. Vercel auto-detect static site
6. Klik "Deploy"
7. Dapat URL dalam 30 detik ✓

### 5. Update landing page kapan aja
```bash
# Ubah file (misal: index.html, styles)
# Commit & push
git add .
git commit -m "Update: sesi 1 tanggal diubah jadi 15 Mei"
git push

# Vercel auto-deploy (30 detik langsung live)
```

---

## 📁 Struktur File

```
handia-webinar/
├── index.html          # Landing page utama (semua kode ada di file ini)
├── .gitignore          # File yang di-ignore Git
├── README.md           # File ini
└── vercel.json         # (optional) Vercel config
```

**Note:** Halaman ini adalah single static HTML dengan embedded CSS & JS. Semua styling ada di `<style>` tag, tidak perlu build process atau dependencies.

---

## 🎨 Customize

### Ubah tanggal & info sesi
Edit di bagian `<!-- LINEUP -->`:
```html
<div class="date">Bulan Depan · 19.30 WIB</div>
```

### Ubah nomor WA atau email
Cari `href="https://wa.me/..."` atau form email, ubah sesuai kebutuhan.

### Ubah warna brand
Di bagian `:root` dalam `<style>`:
```css
--sage:#8FAF9A;
--gold:#CBBA55;
```

### Ubah konten form
Di bagian `<form>` — tambah/hapus field sesuai kebutuhan.

---

## 📊 Analytics & Form Submission

### Google Analytics
1. Buat GA account di https://analytics.google.com
2. Cari measurement ID (`G-XXXXXXXXXX`)
3. Tambahkan di akhir `<body>` sebelum `</body>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Form submission
Opsi:
1. **Pakai Netlify Forms** (kalau hosted di Netlify bukan Vercel) — tambah `netlify` attribute
2. **Pakai Formspree** — ubah `form onsubmit` ke Formspree endpoint
3. **Kirim ke Google Sheets** — pakai Apps Script (lebih kompleks)
4. **Kirim ke WhatsApp HANA** — pakai Twilio/WhatsApp API

Saat ini form hanya dummy (`handleSubmit()`) — tinggal diganti backend yang real.

---

## 🔧 Custom Domain (Optional)

Kalau mau pakai domain sendiri (misal `herprimewebinar.com`):

1. Beli domain di Namecheap/IDwebhost/etc (~Rp50k/tahun)
2. Di Vercel dashboard:
   - Pergi ke project settings
   - Klik "Domains"
   - Tambah domain custom
   - Follow instruksi nameserver / DNS records
3. 5-10 menit kemudian live di domain kamu ✓

---

## 📱 Mobile Responsive

Halaman sudah responsive (tested di mobile). Buka di phone untuk check.

---

## 🐛 Troubleshooting

**Form tidak kirim?**  
Saat ini form hanya dummy. Perlu backend (Firebase, Supabase, atau Google Sheets). Hubungi dev untuk integrasi.

**Vercel deployment gagal?**  
- Pastikan `.gitignore` tidak ignore `index.html`
- Cek repo ada file `index.html` di root
- Re-trigger deploy dari Vercel dashboard

**Halaman loading lambat?**  
- Vercel punya global CDN, seharusnya cepat
- Cek di browser DevTools → Network tab untuk identify bottleneck

---

## 👥 Kontribusi

Perubahan push via Git, review di GitHub PR, merge ke main, auto-deploy Vercel.

---

## 📄 License

Internal HANDIA. Tidak untuk public distribution.

---

**Questions?** Hubungi tim dev atau buka GitHub issue.

---

*Last updated: April 2026*  
*HANDIA × Gayatri — Her Prime Series*
