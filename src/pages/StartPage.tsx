import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useExam } from '../exam/ExamContext'
import { JENJANG, cabangPunyaPaket } from '../data'

/**
 * Halaman Mulai (PRD §7.1).
 * M4: form nama + ringkasan aturan + mulai sesi; deteksi sesi tersimpan.
 * Multi-jenjang & multi-cabang: pilih Jenjang → Cabang → Paket.
 */
export default function StartPage() {
  const navigate = useNavigate()
  const {
    resetSesi,
    sesiSedangBerjalan,
    nama: namaSesi,
    paket,
    gantiPaket,
    daftarCabang,
    cabangAktif,
    daftarPaketCabang,
    gantiCabang,
  } = useExam()
  const [nama, setNama] = useState(namaSesi)
  const [modeDemo, setModeDemo] = useState(false)
  const [jenjangTampil, setJenjangTampil] = useState(
    cabangAktif?.jenjang ?? 'SD',
  )

  const { jumlahPg, jumlahIsian, durasiDetik } = paket.meta
  const totalSoal = jumlahPg + jumlahIsian
  const durasiMenit = Math.round(durasiDetik / 60)

  const cabangJenjang = daftarCabang.filter((c) => c.jenjang === jenjangTampil)

  function mulaiBaru() {
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
            SIMULASI TRY OUT OLIMPIADE SAINS NASIONAL
          </p>
          <h1 className="mt-1 text-3xl font-extrabold leading-tight">
            Arena OSN
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

          {/* Pilih jenjang */}
          <span className="text-sm font-semibold text-tinta">Pilih Jenjang</span>
          <div className="mt-2 flex gap-2">
            {JENJANG.map((j) => (
              <button
                key={j}
                onClick={() => setJenjangTampil(j)}
                className={`flex-1 rounded-xl px-4 py-2 text-sm font-bold transition ${
                  jenjangTampil === j
                    ? 'bg-jingga text-white shadow-sm'
                    : 'bg-jingga-lembut text-tinta hover:brightness-95'
                }`}
              >
                {j}
              </button>
            ))}
          </div>

          {/* Pilih cabang */}
          <span className="mt-5 block text-sm font-semibold text-tinta">
            Pilih Cabang
          </span>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {cabangJenjang.map((c) => {
              const ada = cabangPunyaPaket(c.id)
              const aktif = cabangAktif?.id === c.id
              return (
                <button
                  key={c.id}
                  onClick={() => ada && gantiCabang(c.id)}
                  disabled={!ada}
                  title={ada ? c.deskripsi : 'Segera hadir'}
                  className={`relative flex flex-col items-center gap-1 rounded-xl border-2 px-2 py-3 text-center transition ${
                    aktif
                      ? 'border-jingga bg-jingga-lembut'
                      : ada
                        ? 'border-garis bg-white hover:border-jingga/40 hover:bg-jingga-lembut/40'
                        : 'cursor-not-allowed border-garis bg-slate-50 opacity-60'
                  }`}
                >
                  <span className="text-2xl" aria-hidden="true">
                    {c.ikon}
                  </span>
                  <span className="text-sm font-semibold text-tinta">
                    {c.nama}
                  </span>
                  {!ada && (
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-tinta/40">
                      Segera hadir
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Pilih paket dalam cabang aktif */}
          {cabangAktif && daftarPaketCabang.length > 0 && (
            <label className="mt-5 block">
              <span className="text-sm font-semibold text-tinta">
                Pilih Paket Soal · {cabangAktif.nama} {cabangAktif.jenjang}
              </span>
              <select
                value={paket.meta.id}
                onChange={(e) => gantiPaket(e.target.value)}
                className="mt-2 w-full rounded-xl border border-garis bg-white px-4 py-3 text-tinta outline-none focus:border-jingga focus:ring-2 focus:ring-jingga/30"
              >
                {daftarPaketCabang.map((p) => (
                  <option key={p.meta.id} value={p.meta.id}>
                    {p.meta.kode} — {p.meta.judul}
                  </option>
                ))}
              </select>
              {sesiSedangBerjalan && (
                <span className="mt-1 block text-xs text-tinta/50">
                  Mengganti cabang atau paket akan menghapus sesi yang belum
                  selesai.
                </span>
              )}
            </label>
          )}

          {/* Ringkasan aturan */}
          <div className="mt-6 rounded-2xl bg-jingga-lembut ring-1 ring-jingga-muda p-5">
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
