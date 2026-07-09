# ARSIP — Her Prime Series (3 sesi) · versi Mei 2026

Snapshot landing page **HANDIA × Gayatri "Her Prime: Menopause Glow-Up Series"** yang
di-launch April–Mei 2026 sebagai series 3 webinar.

## Kenapa diarsip
Positioning brand berubah dari **HANDIA × Gayatri (series 3 sesi)** ke
**HANDIA — Handy Healthcare (single webinar, judul provocative pain-point)**
per ToR "Tidur Susah, Mood Berantakan, Kolesterol Naik" (Mei 2026).

Dokter Nuri / Yudhis / Rere dicabut dari landing page publik (jadi TBA).

## Isi arsip
- `index.html` — landing page 3-sesi terakhir sebelum ganti (branch master @ commit `77bc321`)
- `apps-script.gs` — Google Apps Script v4 (auto-headers)

## Kalau mau di-restore
```bash
cp arsip/her-prime-series-3-sesi-2026-05/index.html ../..
cp arsip/her-prime-series-3-sesi-2026-05/apps-script.gs ../..
```
Terus deploy ulang: `vercel --prod --yes`.

Foto dokter (`image/dr-nuri.png`, `dr-yudhis.png`, `dr-rere.png`) & banner Menopause Mastery
**tetap ada di folder `image/`** — jangan dihapus, biar kalau restore langsung jalan.
