/** Tipe data domain Try Out OSN IPS SD (PRD §10.3). */

export type TipeSoal = 'pg' | 'isian'

export type Kesulitan = 'mudah' | 'sedang' | 'sulit'

export type Materi =
  | 'Metode Ilmiah'
  | 'Kenampakan Alam, Sosial & Budaya'
  | 'Keragaman & Perubahan Sosial'
  | 'Kegiatan Ekonomi'
  | 'Sejarah Indonesia'

export interface OpsiPg {
  kode: string // "A".."D"
  teks: string
}

interface SoalDasar {
  id: number
  materi: Materi
  kesulitan: Kesulitan
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
