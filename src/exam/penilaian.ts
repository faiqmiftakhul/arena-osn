import { BOBOT_KESULITAN, type Materi, type PaketSoal, type Soal } from '../types'

/** Normalisasi jawaban isian singkat untuk pencocokan (PRD §8.3). */
export function normalisasiIsian(teks: string): string {
  return teks
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[.,!?;:]+$/g, '')
}

/** Apakah jawaban peserta untuk satu soal benar? */
export function isBenar(soal: Soal, jawaban: string | undefined): boolean {
  if (jawaban == null || jawaban.trim() === '') return false
  if (soal.tipe === 'pg') return jawaban === soal.kunci
  const n = normalisasiIsian(jawaban)
  return soal.kunci.some((k) => normalisasiIsian(k) === n)
}

export interface RekapJenis {
  benar: number
  salah: number
  kosong: number
  total: number
}

export interface DetailSoal {
  soal: Soal
  nomor: number
  jawaban: string | undefined
  benar: boolean
  kosong: boolean
  /** Teks kunci jawaban yang ditampilkan pada pembahasan. */
  kunciTampil: string
}

export interface RekapMateri {
  materi: Materi
  benar: number
  total: number
}

export interface Hasil {
  totalSoal: number
  /** Skor mentah = jumlah jawaban benar. */
  skorMentah: number
  /** Nilai berbobot OSN-P = Σ (benar ? bobot kesulitan : 0). */
  nilaiBerbobot: number
  nilaiBerbobotMaks: number
  rekapPg: RekapJenis
  rekapIsian: RekapJenis
  perMateri: RekapMateri[]
  detail: DetailSoal[]
}

function rekapKosong(): RekapJenis {
  return { benar: 0, salah: 0, kosong: 0, total: 0 }
}

function kunciTampil(soal: Soal): string {
  if (soal.tipe === 'pg') {
    const opsi = soal.opsi.find((o) => o.kode === soal.kunci)
    return opsi ? `${opsi.kode}. ${opsi.teks}` : soal.kunci
  }
  return soal.kunci[0]
}

/** Hitung hasil try out berdasarkan jawaban peserta (PRD §8). */
export function hitungHasil(
  paket: PaketSoal,
  jawaban: Record<number, string>,
): Hasil {
  const rekapPg = rekapKosong()
  const rekapIsian = rekapKosong()
  const materiMap = new Map<Materi, RekapMateri>()
  const detail: DetailSoal[] = []

  let skorMentah = 0
  let nilaiBerbobot = 0
  let nilaiBerbobotMaks = 0

  paket.soal.forEach((soal, i) => {
    const j = jawaban[soal.id]
    const kosong = j == null || j.trim() === ''
    const benar = isBenar(soal, j)
    const bobot = BOBOT_KESULITAN[soal.kesulitan]

    nilaiBerbobotMaks += bobot
    if (benar) {
      skorMentah += 1
      nilaiBerbobot += bobot
    }

    const rekap = soal.tipe === 'pg' ? rekapPg : rekapIsian
    rekap.total += 1
    if (benar) rekap.benar += 1
    else if (kosong) rekap.kosong += 1
    else rekap.salah += 1

    const rm =
      materiMap.get(soal.materi) ??
      { materi: soal.materi, benar: 0, total: 0 }
    rm.total += 1
    if (benar) rm.benar += 1
    materiMap.set(soal.materi, rm)

    detail.push({
      soal,
      nomor: i + 1,
      jawaban: j,
      benar,
      kosong,
      kunciTampil: kunciTampil(soal),
    })
  })

  return {
    totalSoal: paket.soal.length,
    skorMentah,
    nilaiBerbobot: Math.round(nilaiBerbobot * 100) / 100,
    nilaiBerbobotMaks: Math.round(nilaiBerbobotMaks * 100) / 100,
    rekapPg,
    rekapIsian,
    perMateri: [...materiMap.values()],
    detail,
  }
}
