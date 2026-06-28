import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { paketSoal } from '../data'
import type { PaketSoal } from '../types'
import { hapusSesi, muatSesi, simpanSesi } from './penyimpanan'

/**
 * State sesi pengerjaan (PRD §10.4).
 * M2: nama, jawaban, navigasi, tanda ragu.
 * M3: timer hitung mundur berbasis timestamp + status selesai/auto-submit.
 * M4: persistensi localStorage (tahan refresh).
 */
interface ExamSession {
  paket: PaketSoal
  nama: string
  setNama: (n: string) => void

  jawaban: Record<number, string>
  setJawaban: (idSoal: number, nilai: string) => void

  indexAktif: number
  setIndexAktif: (i: number) => void
  berikutnya: () => void
  sebelumnya: () => void

  ragu: Set<number>
  toggleRagu: (idSoal: number) => void

  jumlahTerjawab: number

  sisaDetik: number
  durasiDetik: number
  waktuHabis: boolean
  selesai: boolean
  mulaiTimerJikaPerlu: () => void
  submit: () => void

  /** Ada sesi yang sudah dimulai dan belum dikumpulkan (untuk FR-5). */
  sesiSedangBerjalan: boolean
  /** Mulai sesi baru. durasiDetik opsional untuk mode demo cepat. */
  resetSesi: (nama?: string, durasiDetik?: number) => void
}

const ExamContext = createContext<ExamSession | null>(null)

const tersimpan = muatSesi()

function sisaAwal(
  durasi: number,
  mulaiPada: number | null,
  selesai: boolean,
): number {
  if (mulaiPada == null || selesai) return durasi
  const lewat = Math.floor((Date.now() - mulaiPada) / 1000)
  return Math.max(0, durasi - lewat)
}

export function ExamProvider({ children }: { children: ReactNode }) {
  const paket = paketSoal
  const total = paket.soal.length
  const durasiDefault = paket.meta.durasiDetik

  const [durasiDetik, setDurasiDetik] = useState(
    tersimpan?.durasiDetik ?? durasiDefault,
  )
  const [nama, setNama] = useState(tersimpan?.nama ?? '')
  const [jawaban, setJawabanState] = useState<Record<number, string>>(
    tersimpan?.jawaban ?? {},
  )
  const [indexAktif, setIndexAktif] = useState(tersimpan?.indexAktif ?? 0)
  const [ragu, setRagu] = useState<Set<number>>(
    new Set(tersimpan?.ragu ?? []),
  )
  const [mulaiPada, setMulaiPada] = useState<number | null>(
    tersimpan?.mulaiPada ?? null,
  )
  const [selesai, setSelesai] = useState(tersimpan?.selesai ?? false)
  const [sisaDetik, setSisaDetik] = useState(() =>
    sisaAwal(durasiDetik, tersimpan?.mulaiPada ?? null, tersimpan?.selesai ?? false),
  )

  const setJawaban = useCallback((idSoal: number, nilai: string) => {
    setJawabanState((prev) => ({ ...prev, [idSoal]: nilai }))
  }, [])

  const berikutnya = useCallback(() => {
    setIndexAktif((i) => Math.min(i + 1, total - 1))
  }, [total])

  const sebelumnya = useCallback(() => {
    setIndexAktif((i) => Math.max(i - 1, 0))
  }, [])

  const toggleRagu = useCallback((idSoal: number) => {
    setRagu((prev) => {
      const next = new Set(prev)
      if (next.has(idSoal)) next.delete(idSoal)
      else next.add(idSoal)
      return next
    })
  }, [])

  const mulaiTimerJikaPerlu = useCallback(() => {
    setMulaiPada((prev) => (prev == null ? Date.now() : prev))
  }, [])

  const submit = useCallback(() => {
    setSelesai(true)
  }, [])

  const resetSesi = useCallback(
    (namaBaru?: string, durasiBaru?: number) => {
      hapusSesi()
      const durasi = durasiBaru ?? durasiDefault
      setDurasiDetik(durasi)
      setJawabanState({})
      setRagu(new Set())
      setIndexAktif(0)
      setMulaiPada(null)
      setSelesai(false)
      setSisaDetik(durasi)
      if (namaBaru !== undefined) setNama(namaBaru)
    },
    [durasiDefault],
  )

  // Detak timer: hitung sisa waktu dari selisih timestamp tiap detik.
  useEffect(() => {
    if (mulaiPada == null || selesai) return
    const tick = () => {
      const lewat = Math.floor((Date.now() - mulaiPada) / 1000)
      setSisaDetik(Math.max(0, durasiDetik - lewat))
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [mulaiPada, selesai, durasiDetik])

  // Persist sesi setiap ada perubahan (PRD §11).
  useEffect(() => {
    simpanSesi({
      nama,
      jawaban,
      ragu: [...ragu],
      indexAktif,
      mulaiPada,
      selesai,
      durasiDetik,
    })
  }, [nama, jawaban, ragu, indexAktif, mulaiPada, selesai, durasiDetik])

  const waktuHabis = mulaiPada != null && sisaDetik <= 0

  const jumlahTerjawab = useMemo(
    () => Object.values(jawaban).filter((v) => v.trim() !== '').length,
    [jawaban],
  )

  const sesiSedangBerjalan = mulaiPada != null && !selesai

  const value = useMemo<ExamSession>(
    () => ({
      paket,
      nama,
      setNama,
      jawaban,
      setJawaban,
      indexAktif,
      setIndexAktif,
      berikutnya,
      sebelumnya,
      ragu,
      toggleRagu,
      jumlahTerjawab,
      sisaDetik,
      durasiDetik,
      waktuHabis,
      selesai,
      mulaiTimerJikaPerlu,
      submit,
      sesiSedangBerjalan,
      resetSesi,
    }),
    [
      paket,
      nama,
      jawaban,
      setJawaban,
      indexAktif,
      berikutnya,
      sebelumnya,
      ragu,
      toggleRagu,
      jumlahTerjawab,
      sisaDetik,
      durasiDetik,
      waktuHabis,
      selesai,
      mulaiTimerJikaPerlu,
      submit,
      sesiSedangBerjalan,
      resetSesi,
    ],
  )

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useExam(): ExamSession {
  const ctx = useContext(ExamContext)
  if (!ctx) throw new Error('useExam harus dipakai di dalam <ExamProvider>')
  return ctx
}
