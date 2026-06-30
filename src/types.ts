/** Tipe data domain Try Out OSN IPS SD (PRD §10.3). */

export type TipeSoal = 'pg' | 'isian'

export type Kesulitan = 'mudah' | 'sedang' | 'sulit'

export type Materi =
  | 'Metode Ilmiah'
  | 'Kenampakan Alam, Sosial & Budaya'
  | 'Keragaman & Perubahan Sosial'
  | 'Kegiatan Ekonomi'
  | 'Sejarah Indonesia'

/** Jenjang pendidikan peserta OSN. */
export type Jenjang = 'SD' | 'SMP' | 'SMA'

/**
 * Cabang (mata pelajaran) OSN pada satu jenjang, mis. IPS SD, Matematika SMA.
 * Sebuah cabang bisa belum memiliki paket soal (status "segera hadir").
 */
export interface CabangOSN {
  /** Pengenal unik, mis. "ips-sd". */
  id: string
  /** Nama cabang, mis. "IPS". */
  nama: string
  jenjang: Jenjang
  /** Emoji ikon untuk tampilan kartu (opsional). */
  ikon?: string
  /** Keterangan singkat (opsional). */
  deskripsi?: string
}

export interface OpsiPg {
  kode: string // "A".."D"
  teks: string
}

/** Satu butir pada daftar pernyataan, mis. label "1" / "A" dengan teksnya. */
export interface ItemPernyataan {
  label: string
  teks: string
}

/** Konten tabel: baris pertama dianggap header bila `kolom` diisi. */
export interface KontenTabel {
  kolom: string[] // judul kolom (header)
  baris: string[][] // tiap baris berisi sel-sel sejajar `kolom`
}

/**
 * Ilustrasi soal. `jenis: 'svg'` merujuk komponen gambar bawaan lewat `svgId`;
 * `jenis: 'deskripsi'` menampilkan deskripsi gambar dalam bentuk kalimat
 * (dipakai bila gambar sulit digambar ulang).
 */
export interface KontenGambar {
  jenis: 'svg' | 'deskripsi'
  svgId?: string // id komponen ilustrasi (lihat exam/ilustrasi)
  deskripsi?: string // teks pengganti / keterangan gambar
  alt?: string // teks alternatif aksesibilitas
}

interface SoalDasar {
  id: number
  materi: Materi
  kesulitan: Kesulitan
  /** Kalimat pembuka/konteks sebelum stimulus (opsional). */
  pengantar?: string
  /** Ilustrasi/peta soal (opsional). */
  gambar?: KontenGambar
  /** Stimulus berbentuk tabel (opsional). */
  tabel?: KontenTabel
  /** Stimulus berbentuk daftar pernyataan (opsional). */
  pernyataan?: ItemPernyataan[]
  /** Kalimat pertanyaan inti (selalu ada). */
  pertanyaan: string
}

export interface SoalPg extends SoalDasar {
  tipe: 'pg'
  opsi: OpsiPg[]
  kunci: string // kode opsi benar, mis. "B"
}

export interface SoalIsian extends SoalDasar {
  tipe: 'isian'
  kunci: string[] // daftar jawaban benar yang diterima (alternatif)
}

export type Soal = SoalPg | SoalIsian

export interface PaketMeta {
  /** Pengenal unik paket, mis. "paket-1". */
  id: string
  /** Cabang OSN tempat paket ini bernaung, mis. "ips-sd". */
  cabangId: string
  /** Label singkat, mis. "Paket 1". */
  kode: string
  judul: string
  durasiDetik: number
  jumlahPg: number
  jumlahIsian: number
}

export interface PaketSoal {
  meta: PaketMeta
  soal: Soal[]
}

/** Bobot tingkat kesulitan untuk penilaian berbobot OSN-P (PRD §8). */
export const BOBOT_KESULITAN: Record<Kesulitan, number> = {
  mudah: 1.0,
  sedang: 1.25,
  sulit: 1.5,
}
