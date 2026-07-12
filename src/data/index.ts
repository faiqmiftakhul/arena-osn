import paket1 from './paket-1.json'
import paket2 from './paket-2.json'
import paket3 from './paket-3.json'
import paket4 from './paket-4.json'
import paket5 from './paket-5.json'
import paket6 from './paket-6.json'
import paket7 from './paket-7.json'
import paket8 from './paket-8.json'
import paket9 from './paket-9.json'
import paket10 from './paket-10.json'
import paket11 from './paket-11.json'
import paket12 from './paket-12.json'
import paket13 from './paket-13.json'
import { daftarCabang } from './cabang'
import type { PaketSoal } from '../types'

export { daftarCabang, JENJANG, cariCabang } from './cabang'

/**
 * Registry paket soal (dibundel statis, PRD §10.1).
 * Tambahkan paket baru di sini: import file JSON-nya, set `meta.cabangId`-nya,
 * lalu masukkan ke array. Cabang ditentukan lewat `meta.cabangId` tiap paket.
 */
export const daftarPaket: PaketSoal[] = [
  paket1 as PaketSoal,
  paket2 as PaketSoal,
  paket3 as PaketSoal,
  paket4 as PaketSoal,
  paket5 as PaketSoal,
  paket6 as PaketSoal,
  paket7 as PaketSoal,
  paket8 as PaketSoal,
  paket9 as PaketSoal,
  paket10 as PaketSoal,
  paket11 as PaketSoal,
  paket12 as PaketSoal,
  paket13 as PaketSoal,
]

/** Paket default (paket pertama). */
export const paketSoal: PaketSoal = daftarPaket[0]

/** Cari paket berdasarkan id; fallback ke paket default bila tidak ada. */
export function cariPaket(id: string | null | undefined): PaketSoal {
  return daftarPaket.find((p) => p.meta.id === id) ?? paketSoal
}

/** Semua paket dalam satu cabang. */
export function paketCabang(cabangId: string): PaketSoal[] {
  return daftarPaket.filter((p) => p.meta.cabangId === cabangId)
}

/** Apakah cabang sudah punya minimal satu paket soal. */
export function cabangPunyaPaket(cabangId: string): boolean {
  return daftarPaket.some((p) => p.meta.cabangId === cabangId)
}

/** Id cabang default (cabang pertama yang sudah memiliki paket). */
export const cabangDefaultId: string =
  daftarCabang.find((c) => cabangPunyaPaket(c.id))?.id ?? daftarCabang[0].id
