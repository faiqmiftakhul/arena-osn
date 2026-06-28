/** Format detik menjadi "MM:SS". */
export function formatWaktu(totalDetik: number): string {
  const aman = Math.max(0, Math.floor(totalDetik))
  const menit = Math.floor(aman / 60)
  const detik = aman % 60
  return `${String(menit).padStart(2, '0')}:${String(detik).padStart(2, '0')}`
}

/** Ambang peringatan waktu menipis (5 menit terakhir, PRD §7.2 FR-7). */
export const AMBANG_PERINGATAN_DETIK = 5 * 60
