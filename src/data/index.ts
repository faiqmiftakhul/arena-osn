import paket1 from './paket-1.json'
import paket2 from './paket-2.json'
import type { PaketSoal } from '../types'

/**
 * Registry paket soal (dibundel statis, PRD §10.1).
 * Tambahkan paket baru di sini: import file JSON-nya lalu masukkan ke array.
 */
export const daftarPaket: PaketSoal[] = [paket1 as PaketSoal, paket2 as PaketSoal]

/** Paket default (paket pertama). */
export const paketSoal: PaketSoal = daftarPaket[0]

/** Cari paket berdasarkan id; fallback ke paket default bila tidak ada. */
export function cariPaket(id: string | null | undefined): PaketSoal {
  return daftarPaket.find((p) => p.meta.id === id) ?? paketSoal
}
