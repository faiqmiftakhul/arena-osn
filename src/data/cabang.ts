import type { CabangOSN, Jenjang } from '../types'

/**
 * Daftar cabang (mata pelajaran) OSN per jenjang. Cabang yang belum memiliki
 * paket soal akan tampil sebagai "Segera hadir" (lihat `cabangPunyaPaket`).
 * Untuk mengaktifkan sebuah cabang, cukup tambahkan paket soal dengan
 * `meta.cabangId` yang sama (lihat data/index.ts).
 */
export const daftarCabang: CabangOSN[] = [
  // ── SD ──
  { id: 'mtk-sd', nama: 'Matematika', jenjang: 'SD', ikon: '➗', deskripsi: 'Matematika SD' },
  { id: 'ipa-sd', nama: 'IPA', jenjang: 'SD', ikon: '🔬', deskripsi: 'Ilmu Pengetahuan Alam SD' },
  { id: 'ips-sd', nama: 'IPS', jenjang: 'SD', ikon: '🌏', deskripsi: 'Ilmu Pengetahuan Sosial SD' },

  // ── SMP ──
  { id: 'mtk-smp', nama: 'Matematika', jenjang: 'SMP', ikon: '➗', deskripsi: 'Matematika SMP' },
  { id: 'ipa-smp', nama: 'IPA', jenjang: 'SMP', ikon: '🔬', deskripsi: 'Ilmu Pengetahuan Alam SMP' },
  { id: 'ips-smp', nama: 'IPS', jenjang: 'SMP', ikon: '🌏', deskripsi: 'Ilmu Pengetahuan Sosial SMP' },

  // ── SMA ──
  { id: 'mtk-sma', nama: 'Matematika', jenjang: 'SMA', ikon: '➗', deskripsi: 'Matematika SMA' },
  { id: 'fis-sma', nama: 'Fisika', jenjang: 'SMA', ikon: '🧲', deskripsi: 'Fisika SMA' },
  { id: 'kim-sma', nama: 'Kimia', jenjang: 'SMA', ikon: '⚗️', deskripsi: 'Kimia SMA' },
  { id: 'bio-sma', nama: 'Biologi', jenjang: 'SMA', ikon: '🧬', deskripsi: 'Biologi SMA' },
  { id: 'inf-sma', nama: 'Informatika', jenjang: 'SMA', ikon: '💻', deskripsi: 'Informatika/Komputer SMA' },
  { id: 'eko-sma', nama: 'Ekonomi', jenjang: 'SMA', ikon: '📈', deskripsi: 'Ekonomi SMA' },
  { id: 'geo-sma', nama: 'Geografi', jenjang: 'SMA', ikon: '🗺️', deskripsi: 'Geografi SMA' },
  { id: 'keb-sma', nama: 'Kebumian', jenjang: 'SMA', ikon: '🌋', deskripsi: 'Kebumian SMA' },
  { id: 'ast-sma', nama: 'Astronomi', jenjang: 'SMA', ikon: '🔭', deskripsi: 'Astronomi SMA' },
]

/** Urutan jenjang untuk tampilan tab/filter. */
export const JENJANG: Jenjang[] = ['SD', 'SMP', 'SMA']

/** Cari cabang berdasarkan id. */
export function cariCabang(id: string | null | undefined): CabangOSN | undefined {
  return daftarCabang.find((c) => c.id === id)
}
