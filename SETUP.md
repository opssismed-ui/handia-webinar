# 🚀 Setup GitHub + Vercel Deploy — HANDIA Webinar

Panduan lengkap dari clone repo sampai live di internet. Estimasi waktu: **5-10 menit**.

---

## Step 1: Persiapan

### Yang kamu butuh:
- [ ] Komputer dengan Git installed (atau install dari https://git-scm.com)
- [ ] GitHub account (https://github.com/signup)
- [ ] Vercel account (bisa langsung signup pakai GitHub)

### Check git installed:
```bash
git --version
```

---

## Step 2: Clone / Setup Repo Lokal

Kamu punya 2 pilihan:

### **Pilihan A: Pakai repo yang sudah ada (jika sudah set up)**
```bash
cd /folder/yang/kamu/mau
git clone https://github.com/YOUR-USERNAME/handia-webinar.git
cd handia-webinar
```

### **Pilihan B: Setup dari nol**
```bash
# 1. Buat folder lokal
mkdir handia-webinar
cd handia-webinar

# 2. Init Git
git init

# 3. Copy file dari sini (atau download manual):
# - index.html
# - .gitignore
# - README.md
# - vercel.json

# 4. Add & commit
git add .
git commit -m "Initial commit: HANDIA Her Prime landing page"
```

---

## Step 3: Setup GitHub Remote

### 3a. Buat repo baru di GitHub

1. Buka https://github.com/new
2. **Repository name:** `handia-webinar`
3. **Description:** `Her Prime Menopause Glow-Up Series Landing Page`
4. **Public** (lebih simple untuk Vercel free)
5. Jangan init README/gitignore (udah ada lokal)
6. Klik **Create Repository**

### 3b. Link lokal ke GitHub

Kamu akan dapet instruksi di GitHub. Jalankan di terminal:

```bash
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/handia-webinar.git
git push -u origin main
```

**Ganti `YOUR-USERNAME` dengan username GitHub kamu.**

---

## Step 4: Deploy ke Vercel

### **Opsi 1: Vercel Web Dashboard (RECOMMENDED — paling mudah)**

1. Buka https://vercel.com
2. Klik **Sign Up** → pilih **Continue with GitHub**
3. Authorize Vercel ke GitHub
4. Setelah login, klik **New Project**
5. Pilih repo `handia-webinar` dari list
6. Settings defaultnya udah oke (Vercel auto-detect static site)
7. Klik **Deploy**
8. Tunggu 30-60 detik → **Deployment Complete** ✓

**URL yang didapat:** `handia-webinar.vercel.app` (atau custom nanti)

### **Opsi 2: Vercel CLI (untuk yang agak advanced)**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd handia-webinar
vercel

# Follow prompts:
# - Vercel account? (link GitHub)
# - Link to existing project? (no, first time)
# - Project name? (handia-webinar)
# - Which scope? (personal)
# - Set production? (yes)
# - Directory? (.)
```

Selesai — URL langsung di terminal.

---

## Step 5: Cek Live

Kunjungi URL yang Vercel berikan. Seharusnya landing page sudah live & bisa diakses dari internet.

**Test:**
- [ ] Halaman loading dengan cepat
- [ ] Styling & typography terlihat benar
- [ ] Form bisa diisi (dummy untuk sekarang)
- [ ] Responsive di mobile (buka dari phone)

---

## Step 6: Update Kapan Aja

Setiap kali ada perubahan:

```bash
# Edit file lokal (misal: ubah tanggal sesi)
# Kemudian:

git add .
git commit -m "Update: sesi 1 tanggal diubah jadi 15 Mei"
git push

# 30 detik kemudian, Vercel auto-deploy → live ✓
```

---

## Step 7: Custom Domain (Optional)

Kalau mau URL sendiri (misal `herprimewebinar.com`):

1. Beli domain di **Namecheap** / **IDwebhost** / **GoDaddy** (~Rp50-150k/tahun)
2. Di Vercel dashboard:
   - Buka project
   - Settings → **Domains**
   - Tambah domain baru
   - Ikuti instruksi nameserver
3. 5-10 menit live di domain custom ✓

---

## 📋 Checklist Deployment

- [ ] Git installed & konfigurasi lokal done
- [ ] GitHub account buat & repo created
- [ ] Files di-push ke main branch
- [ ] Vercel project created & deployment sukses
- [ ] URL bisa diakses dari browser
- [ ] Test form & responsive design
- [ ] Share URL untuk testing ke team
- [ ] Custom domain setup (optional)

---

## 🆘 Troubleshooting

### Error: "fatal: not a git repository"
```bash
# Solution: Init git dulu
git init
git add .
git commit -m "first commit"
```

### Error: "Permission denied (publickey)"
```bash
# Solution: Setup SSH key di GitHub
# Ikuti: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
```

### Deployment gagal di Vercel
- Check GitHub push berhasil (`git push`)
- Pastikan folder punya `index.html` di root
- Vercel harus bisa akses repo (public atau private + authorized)
- Lihat build logs di Vercel dashboard untuk error detail

### Halaman tidak ter-update padahal sudah push
- Hard refresh browser: `Ctrl+Shift+R` (Windows) atau `Cmd+Shift+R` (Mac)
- Tunggu 30-60 detik untuk Vercel deploy

### Form tidak kirim data
Saat ini form hanya dummy bahkan baru `handleSubmit()` lokak UI feedback.  
Untuk integrasikan form real:
- Backend bersama HANA AI (supabase/firebase)
- Atau integrasi Google Sheets
- Atau kirim ke WhatsApp HANA langsung

Hubungi dev untuk next step.

---

## 📚 Referensi

- **Vercel Docs:** https://vercel.com/docs
- **Git Basics:** https://git-scm.com/book/en/v2
- **GitHub Desktop** (GUI alternative): https://desktop.github.com
- **Deploy Static HTML:** https://vercel.com/guides/deploying-html-css-js-static-website

---

## ❓ Quick Q&A

**Q: Berapa biaya?**  
A: Gratis selamanya (Vercel free tier sudah cukup). Domain custom ~Rp24k/tahun.

**Q: Bisa update kapan aja?**  
A: Ya, push ke GitHub → auto-deploy Vercel dalam 30 detik.

**Q: Mobile friendly?**  
A: Ya, sudah responsive (tested).

**Q: Analytics?**  
A: Bisa pakai Google Analytics (free). Lihat README.md untuk setup.

**Q: Deploy gagal, gimana?**  
A: Check build logs di Vercel dashboard, atau lihat troubleshooting section di atas.

---

**Pertanyaan? Hubungi tim atau buat GitHub issue.**

*Setup selesai! 🎉*
