# PRD — Aplikasi Web Try Out OSN IPS SD Tingkat Provinsi (OSN-P)

**Versi dokumen:** 1.1 — Sasaran rilis: **Siap Demo (MVP)**
**Tanggal:** 27 Juni 2026
**Status:** Disetujui untuk implementasi (keputusan kunci sudah final, lihat §14)

> **Perubahan v1.1:** menutup 5 pertanyaan terbuka — PG 4 opsi (A–D); soal contoh dibuat oleh tim pengembang; mode pembahasan menampilkan **kunci jawaban saja**; identitas peserta cukup **nama**; skor menampilkan **nilai mentah + berbobot**.

---

## 1. Ringkasan

Aplikasi web latihan (try out) yang menyimulasikan ujian **Olimpiade Sains Nasional bidang IPS tingkat Provinsi (OSN-P)** untuk jenjang SD/MI/Sederajat. Peserta mengerjakan paket soal yang formatnya **identik dengan ketentuan resmi OSN-P 2026**, sehingga siswa terbiasa dengan tampilan, alur, dan tekanan waktu ujian sebenarnya.

Versi ini difokuskan untuk **demo**: berfungsi penuh dari "mulai" sampai "lihat hasil", berjalan di browser tanpa perlu login/akun, dan menggunakan paket soal contoh. Fitur administrasi (bank soal, manajemen pengguna, analitik) berada di luar lingkup demo.

### Kesesuaian dengan ketentuan resmi (sumber)

| Aspek | Ketentuan resmi OSN-P IPS | Diadopsi di app |
|---|---|---|
| Durasi | 60 menit | ✅ Timer 60 menit |
| Pilihan ganda | 40 soal | ✅ 40 soal radio button |
| Isian singkat | 12 soal | ✅ 12 soal input teks |
| Total soal | 52 soal | ✅ 52 soal |
| Penilaian | Benar = +1; salah/kosong = 0; lalu dibobot tingkat kesulitan | ✅ (lihat §8) |

> Sumber: *Panduan OSN SD/MI/Sederajat 2026* hlm. 33–34 (tabel durasi & jumlah soal OSN-P) dan hlm. 40–42 (skema penilaian/pembobotan). Materi soal mengacu *Silabus OSN SD 2026* bagian IPS hlm. 23–28.

---

## 2. Tujuan & Ukuran Keberhasilan

### Tujuan
1. Memberikan pengalaman simulasi ujian OSN-P IPS yang realistis bagi siswa SD.
2. Melatih manajemen waktu (60 menit) dan strategi pengerjaan (menandai soal ragu-ragu, melompati soal).
3. Menyediakan UI yang ramah anak SD: jelas, fokus satu soal, navigasi mudah.

### Ukuran keberhasilan (untuk demo)
- Peserta dapat menyelesaikan satu sesi try out penuh tanpa error.
- Timer berjalan akurat dan otomatis mengakhiri sesi saat 00:00.
- Navigasi antar-soal (berikutnya/sebelumnya/daftar soal/ragu-ragu) berfungsi mulus.
- Skor akhir tampil benar sesuai kunci jawaban contoh.

### Di luar lingkup ukuran (non-goals demo)
- Akurasi pembobotan tingkat kesulitan tingkat produksi (cukup pendekatan, lihat §8).
- Skala banyak pengguna serentak, keamanan anti-curang, integrasi ANBK.

---

## 3. Pengguna & Persona

| Persona | Kebutuhan utama |
|---|---|
| **Siswa SD (peserta)** — kelas IV–VI | Mengerjakan soal dengan tampilan sederhana, tahu sisa waktu, bisa menandai soal ragu, bisa lihat skor. |
| **Guru pembina / orang tua** (sekunder, demo) | Menunjukkan/mendampingi simulasi; melihat hasil akhir siswa. |

Catatan: pada demo tidak ada peran admin/login. Guru cukup membuka aplikasi yang sama.

---

## 4. Lingkup Demo

### 4.1 Termasuk (In Scope)
- Halaman **Mulai** (input nama peserta opsional + tombol "Mulai Try Out").
- Halaman **Pengerjaan** dengan satu soal aktif di tengah.
- Soal **pilihan ganda** (radio button, 1 jawaban) dan **isian singkat** (input teks).
- **Timer 60 menit** dengan auto-submit.
- Navigasi: **Soal Sebelumnya**, **Ragu-ragu** (tandai/lepas tanda), **Soal Berikutnya**.
- Panel **Daftar Soal** (grid nomor) untuk loncat ke soal mana pun, dengan indikator status.
- Halaman **Hasil**: skor (mentah **dan** berbobot), jumlah benar/salah/kosong, rincian per jenis soal.
- **Mode pembahasan ringkas**: pada halaman Hasil, tiap soal dapat menampilkan **kunci jawaban** (jawaban benar) — tanpa penjelasan naratif untuk demo ini.
- Paket soal contoh (52 soal) ber-format JSON, **dibuat oleh tim pengembang**, mengacu silabus IPS.
- Tema warna sesuai ketentuan (`#e18a29`, `#dab724`, putih, dan variasinya).
- Penyimpanan progres sementara di `localStorage` (anti hilang saat refresh).

### 4.2 Tidak Termasuk (Out of Scope, untuk versi berikutnya)
- Login/registrasi, akun, peran (admin/guru/siswa).
- Backend/server, database, sinkronisasi multi-perangkat.
- Bank soal & editor soal (CMS), randomisasi paket, bank besar.
- Penjelasan/pembahasan **naratif** per soal (alasan jawaban). *Demo hanya menampilkan kunci jawaban, lihat §7.7.*
- Anti-curang (deteksi tab switch, fullscreen lock, proktor).
- Ekspor PDF/sertifikat, leaderboard, analitik per kompetensi.
- Aksesibilitas penuh (WCAG) & multi-bahasa.

---

## 5. Cetak Biru Soal (Question Blueprint)

Total **52 soal** dalam satu sesi: **40 pilihan ganda + 12 isian singkat**, durasi **60 menit**.

### 5.1 Cakupan materi (mengacu Silabus IPS OSN 2026)
Soal disebar pada 5 lingkup materi IPS:

| No | Lingkup Materi IPS | Contoh subtopik |
|---|---|---|
| 1 | **Keterampilan dan Metode Ilmiah** | mengamati, menanya, menyimpulkan data sosial |
| 2 | **Kenampakan Fenomena Alam, Sosial dan Budaya** | peta, letak geografis Indonesia, SDA, bentang alam & profesi, gejala alam, ASEAN |
| 3 | **Keragaman, Interaksi dan Perubahan Sosial** | lembaga sosial, nilai & norma, interaksi sosial, globalisasi, keragaman budaya |
| 4 | **Kegiatan Ekonomi, Peran & Posisi Indonesia dalam Ekonomi Global** | masalah ekonomi, uang, pelaku ekonomi, ekspor-impor, ekonomi maritim/agraris, ASEAN |
| 5 | **Perkembangan Sejarah Indonesia** | masa Hindu-Buddha-Islam, kolonialisme, perjuangan kemerdekaan, tokoh nasional/lokal |

### 5.2 Distribusi (saran untuk paket demo)
Distribusi merata dengan penekanan proporsional (dapat disesuaikan saat penyusunan soal):

| Lingkup | Pilihan Ganda | Isian Singkat |
|---|---|---|
| 1. Metode Ilmiah | 4 | 1 |
| 2. Kenampakan Alam/Sosial/Budaya | 9 | 3 |
| 3. Keragaman & Perubahan Sosial | 9 | 3 |
| 4. Kegiatan Ekonomi | 9 | 3 |
| 5. Sejarah Indonesia | 9 | 2 |
| **Total** | **40** | **12** |

### 5.3 Tingkat kesulitan (untuk pembobotan, §8)
Mengikuti pola resmi OSN-P (proporsi Mudah : Sedang : Sulit = 1 : 2 : 1):

- **Pilihan ganda (40):** 10 Mudah, 20 Sedang, 10 Sulit.
- **Isian singkat (12):** 3 Mudah, 6 Sedang, 3 Sulit.

> Untuk demo, soal contoh boleh placeholder yang relevan dengan silabus; yang penting struktur, metadata kesulitan, dan kunci jawaban lengkap.

---

## 6. Alur Pengguna (User Flow)

```
[Halaman Mulai]
   │ isi nama (opsional) → klik "Mulai Try Out"
   ▼
[Halaman Pengerjaan]  ── timer 60:00 mulai berjalan
   │ kerjakan soal 1..52 (urutan bebas)
   │ ├─ pilih jawaban / isi teks  → tersimpan otomatis
   │ ├─ "Ragu-ragu"               → tandai/lepas
   │ ├─ "Soal Sebelumnya/Berikutnya"
   │ └─ "Daftar Soal"             → loncat ke nomor mana pun
   │
   │ klik "Selesai & Kumpulkan"  ──► [Dialog Konfirmasi]
   │ atau timer habis (00:00)    ──► auto-submit
   ▼
[Halaman Hasil]
   └─ skor, benar/salah/kosong, rincian per jenis & per materi
   └─ "Ulangi Try Out"
```

---

## 7. Persyaratan Fungsional (Layar & Komponen)

### 7.1 Halaman Mulai
- **FR-1** Judul aplikasi + identitas "Try Out OSN IPS SD — Tingkat Provinsi".
- **FR-2** Ringkasan aturan: 52 soal (40 PG + 12 isian), waktu 60 menit, 1 jawaban per PG.
- **FR-3** Input **nama peserta** (satu-satunya identitas; opsional, tidak memblokir). Tidak ada field sekolah/kelas pada demo.
- **FR-4** Tombol **"Mulai Try Out"** → memulai sesi & timer.
- **FR-5** Jika ada sesi tersimpan (`localStorage`), tawarkan **"Lanjutkan"** atau **"Mulai Baru"**.

### 7.2 Header (selalu tampil saat pengerjaan)
- **FR-6** Tombol **"Daftar Soal"** (kiri) untuk membuka panel/grid nomor soal.
- **FR-7** **Timer hitung mundur** `MM:SS` (kanan), menonjol. Warna berubah saat ≤5 menit (peringatan).
- **FR-8** Indikator progres ringkas (mis. "Terjawab 30/52").

### 7.3 Area Soal (tengah, fokus utama)
- **FR-9** Menampilkan **satu soal aktif**: nomor soal, label jenis ("Pilihan Ganda" / "Isian Singkat"), teks soal, (opsional) gambar/peta pendukung.
- **FR-10** **Pilihan ganda:** opsi A–D/E dengan **radio button**, hanya 1 dapat dipilih, bisa diganti.
- **FR-11** **Isian singkat:** kotak input teks satu baris; jawaban tersimpan otomatis saat mengetik/berpindah soal.
- **FR-12** Penanda visual bila soal aktif sedang **ditandai ragu-ragu**.

### 7.4 Footer Navigasi (bawah)
- **FR-13** Tombol **"Soal Sebelumnya"** (nonaktif di soal 1).
- **FR-14** Tombol **"Ragu-ragu"** — toggle tandai/lepas tanda pada soal aktif.
- **FR-15** Tombol **"Soal Berikutnya"** (di soal terakhir berubah jadi/berdampingan dengan **"Selesai & Kumpulkan"**).

### 7.5 Panel Daftar Soal
- **FR-16** Grid nomor **1–52**, klik nomor → loncat ke soal tersebut & panel tertutup.
- **FR-17** Setiap nomor menampilkan **status warna**:
  - **Belum dibuka / belum dijawab** (netral)
  - **Sudah dijawab** (hijau/aksen)
  - **Ragu-ragu** (penanda khusus, mis. kuning + ikon)
  - **Soal aktif** (highlight)
- **FR-18** Pemisah/keterangan kelompok: **Pilihan Ganda (1–40)** dan **Isian Singkat (41–52)**.
- **FR-19** Legenda warna status.
- **FR-20** Tombol **"Selesai & Kumpulkan"** juga tersedia di panel ini.

### 7.6 Konfirmasi & Submit
- **FR-21** Klik "Selesai & Kumpulkan" → dialog konfirmasi menampilkan jumlah belum dijawab & ragu-ragu.
- **FR-22** Saat timer habis → **auto-submit** tanpa konfirmasi, langsung ke Hasil.

### 7.7 Halaman Hasil
- **FR-23** Skor akhir + nama peserta. Tampilkan **dua angka**: **skor mentah** (jumlah benar) dan **nilai berbobot** OSN-P (lihat §8), dengan label yang jelas.
- **FR-24** Rekap: jumlah **benar / salah / kosong**, dipisah **PG** dan **Isian**.
- **FR-25** (Opsional demo) rekap per lingkup materi.
- **FR-26** **Mode pembahasan (kunci jawaban):** daftar/rincian per soal yang menampilkan jawaban peserta, **kunci jawaban yang benar**, dan status benar/salah. *Tidak ada penjelasan naratif pada demo.*
- **FR-27** Tombol **"Ulangi Try Out"** (reset sesi).

---

## 8. Aturan Penilaian (Scoring)

Mengacu skema resmi OSN-P (Panduan hlm. 40–42):

1. **Skor mentah per butir:** jawaban **benar = +1**, **salah / tidak menjawab = 0** — berlaku untuk PG maupun isian singkat.
2. **Pembobotan tingkat kesulitan** (tahap kedua):

   | Tingkat | Bobot |
   |---|---|
   | Mudah | 1,00 |
   | Sedang | 1,25 |
   | Sulit | 1,50 |

   Nilai butir = (benar? 1 : 0) × bobot kesulitan. **Nilai akhir = total seluruh butir** (PG + isian).

3. **Pencocokan isian singkat (demo):** case-insensitive, trim spasi, dan dukung **daftar jawaban alternatif** per soal (mis. `["Soekarno","Sukarno"]`). Normalisasi sederhana (huruf kecil, hapus tanda baca opsional). *Pencocokan canggih di luar lingkup demo.*

4. Tampilkan baik **skor mentah** (jumlah benar) maupun **nilai berbobot**, agar mudah dipahami siswa.

---

## 9. Desain Visual & Tema

### 9.1 Palet warna
| Token | Hex | Penggunaan |
|---|---|---|
| Primary / Oranye | `#e18a29` | Header, tombol utama, highlight soal aktif |
| Secondary / Kuning | `#dab724` | Aksen, penanda "ragu-ragu", peringatan timer |
| Putih | `#ffffff` | Latar utama area soal, kartu |
| Variasi terang (oranye 10–20%) | `#f6d9b4` / `#fbeede` | Latar lembut, hover, panel |
| Variasi terang (kuning 10–20%) | `#f3e7a6` / `#faf3cf` | Badge status, latar legenda |
| Netral teks | `#3a3a3a` | Teks soal & UI |
| Netral garis/abu | `#e7e4dd` | Border, garis pemisah, status "belum dijawab" |
| Sukses | `#3f9d5a` (turunan, opsional) | Status "sudah dijawab" |

> Prinsip: dominan **putih + oranye `#e18a29`** sebagai warna utama, **kuning `#dab724`** sebagai aksen/penanda. Kontras teks dijaga agar terbaca anak SD.

### 9.2 Prinsip UI
- **Fokus satu soal**: area soal besar di tengah, distraksi minimal.
- **Tombol besar & jelas** (target sentuh ramah, label teks penuh berbahasa Indonesia).
- **Timer selalu terlihat**, berubah warna ke kuning/merah saat menipis.
- **Konsisten & ramah anak**: tipografi besar, ikon sederhana, sudut membulat.
- **Responsif**: desktop & tablet diutamakan (perangkat ujian umumnya laptop/PC).

### 9.3 Sketsa tata letak (wireframe teks)
```
┌───────────────────────────────────────────────────────────┐
│ [≡ Daftar Soal]      Try Out OSN IPS — Provinsi   ⏱ 59:12 │  ← header (oranye)
├───────────────────────────────────────────────────────────┤
│  Soal No. 12  ·  Pilihan Ganda                  [★ ragu]   │
│                                                            │
│  Perhatikan peta berikut. Manakah yang menunjukkan ...     │
│                                                            │
│   ( ) A.  ...                                              │
│   (•) B.  ...                                              │
│   ( ) C.  ...                                              │
│   ( ) D.  ...                                              │
│                                                            │
├───────────────────────────────────────────────────────────┤
│ [‹ Soal Sebelumnya]   [★ Ragu-ragu]   [Soal Berikutnya ›] │  ← footer
└───────────────────────────────────────────────────────────┘

Panel Daftar Soal (overlay):
  Pilihan Ganda (1–40)
   [1][2][3][4][5][6][7][8][9][10] ...
  Isian Singkat (41–52)
   [41][42][43] ...
  Legenda: ▢ belum  ◼ terjawab  ★ ragu  ⬚ aktif
```

---

## 10. Data & Arsitektur (untuk demo)

### 10.1 Pendekatan
- **Single Page Application** murni front-end. Tidak perlu backend untuk demo.
- Soal dimuat dari **file JSON statis** yang dibundel bersama aplikasi.
- State sesi (jawaban, tanda ragu, sisa waktu) disimpan di **`localStorage`** agar tahan refresh.

### 10.2 Saran teknologi
- **React + Vite + TypeScript**, styling dengan **Tailwind CSS** (atau CSS modules).
- State ringan via React state/Context (tanpa lib state besar untuk demo).
- Tanpa dependency berat; mudah di-deploy sebagai berkas statis (Vercel/Netlify/hosting statis).

> *Catatan: ini rekomendasi, bisa disesuaikan preferensi tim saat tahap implementasi.*

### 10.3 Skema data soal (contoh)
```json
{
  "meta": {
    "judul": "Try Out OSN IPS SD — Tingkat Provinsi",
    "durasiDetik": 3600,
    "jumlahPg": 40,
    "jumlahIsian": 12
  },
  "soal": [
    {
      "id": 1,
      "tipe": "pg",
      "materi": "Sejarah Indonesia",
      "kesulitan": "sedang",
      "pertanyaan": "Tokoh yang dikenal sebagai Bapak Proklamator adalah ...",
      "gambar": null,
      "opsi": [
        { "kode": "A", "teks": "Soekarno & Hatta" },
        { "kode": "B", "teks": "..." },
        { "kode": "C", "teks": "..." },
        { "kode": "D", "teks": "..." }
      ],
      "kunci": "A"
    },
    {
      "id": 41,
      "tipe": "isian",
      "materi": "Kegiatan Ekonomi",
      "kesulitan": "mudah",
      "pertanyaan": "Mata uang resmi negara Indonesia adalah ...",
      "gambar": null,
      "kunci": ["Rupiah", "rupiah", "IDR"]
    }
  ]
}
```

### 10.4 Model state sesi
```
sesi = {
  namaPeserta: string,
  mulaiPada: timestamp,
  sisaDetik: number,
  soalAktif: number,          // index/id
  jawaban: { [idSoal]: string },   // "A".."E" atau teks isian
  ragu: Set<idSoal>,
  selesai: boolean
}
```

---

## 11. Persyaratan Non-Fungsional

- **Performa:** transisi antar-soal instan (<100 ms); tidak ada reload halaman.
- **Keandalan timer:** akurat berbasis timestamp (bukan hanya `setInterval`), tahan refresh — hitung dari `mulaiPada`.
- **Ketahanan data:** jawaban tersimpan otomatis tiap perubahan; aman saat refresh tak sengaja.
- **Kompatibilitas:** Chrome/Edge/Firefox versi terbaru; layar laptop & tablet.
- **Bahasa:** seluruh antarmuka **Bahasa Indonesia**.
- **Tanpa data pribadi sensitif:** hanya nama (opsional), disimpan lokal.

### Nice-to-have (jika waktu memungkinkan, tetap MVP)
- **Penjelasan naratif** per soal pada pembahasan (di luar lingkup demo; demo hanya kunci jawaban — lihat FR-26).
- Suara/indikator halus saat 5 menit terakhir.

---

## 12. Kriteria Penerimaan Demo (Acceptance)

1. Dari halaman Mulai, peserta dapat memulai sesi dan timer 60:00 berjalan turun.
2. Soal pilihan ganda menampilkan radio button; hanya 1 opsi terpilih; pilihan dapat diganti.
3. Soal isian singkat menerima input teks dan menyimpannya.
4. Tombol Sebelumnya/Berikutnya berpindah soal sesuai urutan; batas awal/akhir ditangani.
5. Tombol Ragu-ragu menandai/melepas tanda, dan status tampak di Daftar Soal.
6. Panel Daftar Soal menampilkan 52 nomor dengan status warna benar dan dapat loncat ke soal mana pun.
7. Refresh halaman tidak menghilangkan jawaban, tanda ragu, maupun sisa waktu.
8. Saat timer habis, sesi otomatis dikumpulkan dan menampilkan Hasil.
9. Halaman Hasil menampilkan **skor mentah dan nilai berbobot**, serta rekap benar/salah/kosong sesuai kunci contoh.
10. Mode pembahasan menampilkan **kunci jawaban benar** per soal beserta jawaban peserta dan status benar/salah.
11. Tema warna sesuai palet (dominan putih + `#e18a29`, aksen `#dab724`).

---

## 13. Rencana Bertahap (Saran)

| Tahap | Isi | Hasil |
|---|---|---|
| **M1 — Kerangka** | Setup proyek, routing 3 layar, tema warna | Aplikasi bisa dibuka, navigasi dasar |
| **M2 — Mesin soal** | Render PG & isian, simpan jawaban, navigasi prev/next | Bisa mengerjakan soal |
| **M3 — Timer & Daftar Soal** | Timer 60 mnt + auto-submit, panel daftar soal + status, ragu-ragu | Simulasi ujian lengkap |
| **M4 — Hasil & Skoring** | Perhitungan skor + pembobotan, halaman hasil, persistensi localStorage | Demo siap |
| **M5 — Poles** | Paket 52 soal contoh, penyempurnaan UI, uji terima | Siap dipresentasikan |

---

## 14. Keputusan Final (sebelumnya pertanyaan terbuka)

| # | Keputusan | Final |
|---|---|---|
| 1 | **Jumlah opsi PG** | **4 opsi (A–D)** |
| 2 | **Isi soal demo** | **Dibuat oleh tim pengembang**, mengacu Silabus IPS |
| 3 | **Mode pembahasan** | **Termasuk demo**, menampilkan **kunci jawaban saja** (tanpa penjelasan naratif) |
| 4 | **Identitas peserta** | **Nama saja** (opsional) |
| 5 | **Tampilan skor** | **Keduanya** — skor mentah **dan** nilai berbobot OSN-P |

---

*Dokumen ini adalah PRD untuk versi siap demo. Implementasi dilakukan setelah persetujuan. Format & aturan mengacu Panduan OSN SD 2026 (hlm. 33–34, 40–42) dan Silabus OSN SD 2026 bagian IPS (hlm. 23–28).*
