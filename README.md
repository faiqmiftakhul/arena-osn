# Try Out OSN IPS SD — Tingkat Provinsi (OSN-P)

Aplikasi web latihan (try out) yang menyimulasikan ujian **Olimpiade Sains Nasional bidang IPS tingkat Provinsi (OSN-P)** jenjang SD/MI. Format mengikuti ketentuan resmi *Panduan OSN SD 2026*: **40 soal pilihan ganda + 12 soal isian singkat, durasi 60 menit**.

> Spesifikasi lengkap ada di [`PRD.md`](./PRD.md). Versi ini adalah build **siap demo (MVP)**.

## Fitur

- ⏱️ **Timer 60 menit** berbasis timestamp (akurat & tahan refresh) + **auto-submit** saat waktu habis.
- 📝 Soal **pilihan ganda** (radio button A–D) dan **isian singkat** (input teks).
- 🧭 Navigasi: **Sebelumnya / Ragu-ragu / Berikutnya** + panel **Daftar Soal** (grid 52 nomor dengan status warna).
- 💾 **Persistensi otomatis** ke `localStorage` — jawaban, tanda ragu, dan sisa waktu tidak hilang saat halaman dimuat ulang. Mendukung **Lanjutkan Sesi**.
- 📊 **Hasil**: skor mentah + nilai berbobot OSN-P (Mudah 1,00 / Sedang 1,25 / Sulit 1,50), rekap benar/salah/kosong, rekap per materi.
- 🔑 **Pembahasan kunci jawaban** per soal.
- 🎨 Tema warna jingga `#e18a29` + kuning `#dab724` + putih.

## Menjalankan

Prasyarat: Node.js 18+ (diuji pada Node 24).

```bash
npm install      # sekali saja
npm run dev      # mode pengembangan → http://localhost:5173
```

Build produksi (berkas statis siap deploy ke hosting mana pun):

```bash
npm run build    # output ke folder dist/
npm run preview  # pratinjau hasil build
```

## Skrip demo singkat

1. Buka halaman Mulai, isi nama (opsional).
2. Centang **"Mode demo cepat (waktu 1 menit)"** bila ingin memperagakan auto-submit tanpa menunggu 60 menit.
3. Klik **Mulai Try Out**.
4. Kerjakan beberapa soal, coba tombol **Ragu-ragu** dan **Daftar Soal** (lihat status warna).
5. Klik **Selesai & Kumpulkan** (atau biarkan waktu habis pada mode demo) → halaman **Hasil**.
6. Buka **Pembahasan (Kunci Jawaban)** untuk meninjau jawaban.

## Struktur proyek

```
src/
├── data/
│   ├── paket-soal.json     # 52 soal contoh (40 PG + 12 isian) sesuai Silabus IPS
│   └── index.ts            # loader bertipe
├── exam/
│   ├── ExamContext.tsx     # state sesi: jawaban, navigasi, ragu, timer, persistensi
│   ├── SoalView.tsx        # render satu soal (PG / isian)
│   ├── DaftarSoalPanel.tsx # panel grid nomor soal + status
│   ├── penilaian.ts        # perhitungan skor & pembahasan
│   ├── penyimpanan.ts      # baca/tulis localStorage
│   └── util.ts             # format waktu
├── pages/
│   ├── StartPage.tsx       # halaman Mulai
│   ├── ExamPage.tsx        # halaman Pengerjaan
│   └── ResultPage.tsx      # halaman Hasil + pembahasan
├── router.tsx              # rute: / , /ujian , /hasil
├── types.ts                # tipe domain + bobot kesulitan
└── index.css               # tema warna (Tailwind v4)
```

## Catatan

- **Soal bersifat contoh** (dibuat untuk demo, mengacu cakupan materi Silabus IPS OSN 2026). Untuk produksi, ganti isi `src/data/paket-soal.json`.
- Aplikasi berjalan **sepenuhnya di sisi klien** (tanpa backend). Tidak ada login; identitas hanya nama (opsional).
- Di luar lingkup demo: bank soal/CMS, akun & peran, anti-curang, analitik. Lihat PRD §4.2.

## Teknologi

React 19 · Vite 7 · TypeScript · Tailwind CSS v4 · React Router 7
