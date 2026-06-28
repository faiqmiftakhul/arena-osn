import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useExam } from '../exam/ExamContext'

/**
 * Halaman Mulai (PRD §7.1).
 * M4: form nama + ringkasan aturan + mulai sesi; deteksi sesi tersimpan
 * untuk Lanjutkan / Mulai Baru (FR-5).
 */
export default function StartPage() {
  const navigate = useNavigate()
  const {
    resetSesi,
    sesiSedangBerjalan,
    nama: namaSesi,
    paket,
    daftarPaket,
    gantiPaket,
  } = useExam()
  const [nama, setNama] = useState(namaSesi)
  const [modeDemo, setModeDemo] = useState(false)

  const { jumlahPg, jumlahIsian, durasiDetik } = paket.meta
  const totalSoal = jumlahPg + jumlahIsian
  const durasiMenit = Math.round(durasiDetik / 60)

  function mulaiBaru() {
    // Mode demo: durasi 1 menit agar auto-submit mudah diperagakan.
    resetSesi(nama.trim(), modeDemo ? 60 : undefined)
    navigate('/ujian')
  }

  function lanjutkan() {
    navigate('/ujian')
  }

  return (
    <main className="min-h-full flex items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-xl ring-1 ring-garis overflow-hidden">
        {/* Header berwarna jingga */}
        <div className="bg-jingga px-8 py-7 text-white">
          <p className="text-sm font-semibold tracking-wide opacity-90">
            OLIMPIADE SAINS NASIONAL · TINGKAT PROVINSI
          </p>
          <h1 className="mt-1 text-3xl font-extrabold leading-tight">
            Try Out OSN IPS SD
          </h1>
        </div>

        <div className="p-8">
          {/* Banner lanjutkan sesi */}
          {sesiSedangBerjalan && (
            <div className="mb-6 rounded-2xl bg-kuning-lembut p-4 ring-1 ring-kuning-muda">
              <p className="text-sm font-semibold text-tinta">
                Kamu punya sesi try out yang belum selesai.
              </p>
              <button
                onClick={lanjutkan}
                className="mt-3 w-full rounded-xl bg-kuning px-6 py-3 font-bold text-tinta hover:brightness-95"
              >
                Lanjutkan Sesi
              </button>
            </div>
          )}

          {/* Pemilih paket soal */}
          <label className="mb-6 block">
            <span className="text-sm font-semibold text-tinta">Pilih Paket Soal</span>
            <select
              value={paket.meta.id}
              onChange={(e) => gantiPaket(e.target.value)}
              className="mt-2 w-full rounded-xl border border-garis bg-white px-4 py-3 text-tinta outline-none focus:border-jingga focus:ring-2 focus:ring-jingga/30"
            >
              {daftarPaket.map((p) => (
                <option key={p.meta.id} value={p.meta.id}>
                  {p.meta.kode} — {p.meta.judul}
                </option>
              ))}
            </select>
            {sesiSedangBerjalan && (
              <span className="mt-1 block text-xs text-tinta/50">
                Mengganti paket akan menghapus sesi yang belum selesai.
              </span>
            )}
          </label>

          {/* Ringkasan aturan */}
          <div className="rounded-2xl bg-jingga-lembut ring-1 ring-jingga-muda p-5">
            <h2 className="font-bold text-tinta">Ketentuan Try Out</h2>
            <ul className="mt-2 space-y-1 text-sm text-tinta/80">
              <li>
                • {totalSoal} soal: {jumlahPg} pilihan ganda + {jumlahIsian}{' '}
                isian singkat
              </li>
              <li>• Waktu pengerjaan {durasiMenit} menit</li>
              <li>• Pilihan ganda: 1 jawaban (A–D)</li>
            </ul>
          </div>

          {/* Input nama */}
          <label className="mt-6 block">
            <span className="text-sm font-semibold text-tinta">
              Nama Peserta{' '}
              <span className="font-normal text-tinta/50">(opsional)</span>
            </span>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Tulis namamu di sini"
              className="mt-2 w-full rounded-xl border border-garis bg-white px-4 py-3 text-tinta outline-none focus:border-jingga focus:ring-2 focus:ring-jingga/30"
            />
          </label>

          <button
            onClick={mulaiBaru}
            className="mt-6 w-full rounded-xl bg-jingga px-6 py-4 text-lg font-bold text-white shadow-md transition hover:bg-jingga-tua active:scale-[0.99]"
          >
            {sesiSedangBerjalan ? 'Mulai Baru (hapus sesi lama)' : 'Mulai Try Out'}
          </button>

          {/* Mode demo cepat untuk memperagakan auto-submit */}
          <label className="mt-4 flex items-center justify-center gap-2 text-sm text-tinta/60">
            <input
              type="checkbox"
              checked={modeDemo}
              onChange={(e) => setModeDemo(e.target.checked)}
              className="h-4 w-4 accent-[var(--color-jingga)]"
            />
            Mode demo cepat (waktu 1 menit)
          </label>
        </div>
      </div>
    </main>
  )
}
