/** Persistensi sesi ke localStorage (PRD §10.1, §11 — tahan refresh). */

const KEY = 'tryout-osn-ips-sd:v2'

export interface SesiTersimpan {
  nama: string
  jawaban: Record<number, string>
  ragu: number[]
  indexAktif: number
  mulaiPada: number | null
  selesai: boolean
  /** Durasi sesi dalam detik (mendukung mode demo cepat). Opsional demi kompatibilitas. */
  durasiDetik?: number
}

export function muatSesi(): SesiTersimpan | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as SesiTersimpan
    // Validasi ringan terhadap struktur.
    if (typeof data !== 'object' || data === null) return null
    if (typeof data.jawaban !== 'object' || !Array.isArray(data.ragu)) return null
    return data
  } catch {
    return null
  }
}

export function simpanSesi(sesi: SesiTersimpan): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(sesi))
  } catch {
    // Abaikan bila localStorage tidak tersedia / penuh.
  }
}

export function hapusSesi(): void {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // Abaikan.
  }
}
