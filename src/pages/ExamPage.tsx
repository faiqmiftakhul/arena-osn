import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useExam } from '../exam/ExamContext'
import SoalView from '../exam/SoalView'
import DaftarSoalPanel from '../exam/DaftarSoalPanel'
import { AMBANG_PERINGATAN_DETIK, formatWaktu } from '../exam/util'

/**
 * Halaman Pengerjaan (PRD §7.2–7.6).
 * M3: timer hitung mundur + auto-submit, panel Daftar Soal dengan status,
 * dialog konfirmasi kumpulkan. (Perhitungan skor di M4.)
 */
export default function ExamPage() {
  const navigate = useNavigate()
  const {
    paket,
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
    waktuHabis,
    selesai,
    mulaiTimerJikaPerlu,
    submit,
  } = useExam()

  const [panelTerbuka, setPanelTerbuka] = useState(false)
  const [konfirmasiTerbuka, setKonfirmasiTerbuka] = useState(false)

  const soal = paket.soal[indexAktif]
  const total = paket.soal.length
  const nomor = indexAktif + 1
  const isPertama = indexAktif === 0
  const isTerakhir = indexAktif === total - 1
  const sedangRagu = ragu.has(soal.id)
  const waktuMenipis = sisaDetik <= AMBANG_PERINGATAN_DETIK

  // Mulai timer saat masuk halaman ujian.
  useEffect(() => {
    mulaiTimerJikaPerlu()
  }, [mulaiTimerJikaPerlu])

  // Gulir ke atas tiap berpindah soal agar pertanyaan selalu terlihat penuh.
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [indexAktif])

  // Auto-submit ketika waktu habis (PRD §7.6 FR-22).
  useEffect(() => {
    if (waktuHabis && !selesai) {
      submit()
      navigate('/hasil')
    }
  }, [waktuHabis, selesai, submit, navigate])

  function kumpulkan() {
    submit()
    navigate('/hasil')
  }

  const belumDijawab = total - jumlahTerjawab

  return (
    <div className="min-h-full flex flex-col">
      {/* Header */}
      <header className="bg-jingga text-white shadow-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <button
            onClick={() => setPanelTerbuka(true)}
            className="rounded-lg bg-white/15 px-4 py-2 text-sm font-semibold hover:bg-white/25"
          >
            ☰ Daftar Soal
          </button>
          <span className="hidden text-sm font-semibold sm:block">
            Terjawab {jumlahTerjawab}/{total}
          </span>
          <div
            className={`rounded-lg px-4 py-2 font-mono text-lg font-bold tabular-nums ${
              waktuMenipis
                ? 'animate-pulse bg-kuning text-tinta'
                : 'bg-white/15 text-white'
            }`}
            title="Sisa waktu"
          >
            ⏱ {formatWaktu(sisaDetik)}
          </div>
        </div>
      </header>

      {/* Area soal */}
      <main className="mx-auto w-full max-w-3xl flex-1 p-4">
        <SoalView
          soal={soal}
          nomor={nomor}
          jawaban={jawaban[soal.id]}
          ragu={sedangRagu}
          onJawab={(nilai) => setJawaban(soal.id, nilai)}
        />
      </main>

      {/* Footer navigasi */}
      <footer className="sticky bottom-0 border-t border-garis bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-2 p-3">
          <button
            onClick={sebelumnya}
            disabled={isPertama}
            className="rounded-xl border border-garis px-4 py-3 text-sm font-semibold text-tinta/70 enabled:hover:bg-jingga-lembut disabled:cursor-not-allowed disabled:opacity-40"
          >
            ‹ Sebelumnya
          </button>

          <button
            onClick={() => toggleRagu(soal.id)}
            className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
              sedangRagu
                ? 'bg-kuning text-tinta'
                : 'bg-kuning-muda text-tinta hover:bg-kuning'
            }`}
          >
            ★ Ragu-ragu
          </button>

          {isTerakhir ? (
            <button
              onClick={() => setKonfirmasiTerbuka(true)}
              className="rounded-xl bg-sukses px-4 py-3 text-sm font-bold text-white hover:brightness-95"
            >
              Selesai & Kumpulkan
            </button>
          ) : (
            <button
              onClick={berikutnya}
              className="rounded-xl bg-jingga px-4 py-3 text-sm font-bold text-white hover:bg-jingga-tua"
            >
              Berikutnya ›
            </button>
          )}
        </div>
      </footer>

      {/* Panel Daftar Soal */}
      {panelTerbuka && (
        <DaftarSoalPanel
          soal={paket.soal}
          indexAktif={indexAktif}
          jawaban={jawaban}
          ragu={ragu}
          onPilih={(i) => {
            setIndexAktif(i)
            setPanelTerbuka(false)
          }}
          onTutup={() => setPanelTerbuka(false)}
          onSelesai={() => {
            setPanelTerbuka(false)
            setKonfirmasiTerbuka(true)
          }}
        />
      )}

      {/* Dialog konfirmasi kumpulkan (PRD §7.6 FR-21) */}
      {konfirmasiTerbuka && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <button
            className="absolute inset-0 bg-black/40"
            onClick={() => setKonfirmasiTerbuka(false)}
            aria-label="Batal"
          />
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-tinta">Kumpulkan jawaban?</h3>
            <p className="mt-2 text-sm text-tinta/70">
              Pastikan kamu sudah memeriksa jawaban. Setelah dikumpulkan, sesi
              tidak bisa dilanjutkan.
            </p>
            <div className="mt-4 space-y-1 rounded-xl bg-jingga-lembut p-3 text-sm">
              <div className="flex justify-between">
                <span>Sudah dijawab</span>
                <span className="font-bold">
                  {jumlahTerjawab}/{total}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Belum dijawab</span>
                <span className="font-bold text-bahaya">{belumDijawab}</span>
              </div>
              <div className="flex justify-between">
                <span>Ditandai ragu-ragu</span>
                <span className="font-bold">{ragu.size}</span>
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setKonfirmasiTerbuka(false)}
                className="flex-1 rounded-xl border border-garis px-4 py-3 text-sm font-semibold text-tinta/70 hover:bg-jingga-lembut"
              >
                Periksa lagi
              </button>
              <button
                onClick={kumpulkan}
                className="flex-1 rounded-xl bg-sukses px-4 py-3 text-sm font-bold text-white hover:brightness-95"
              >
                Ya, kumpulkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
