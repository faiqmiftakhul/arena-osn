import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useExam } from '../exam/ExamContext'
import { hitungHasil, type RekapJenis } from '../exam/penilaian'

/**
 * Halaman Hasil (PRD §7.7).
 * M4: skor mentah + nilai berbobot, rekap benar/salah/kosong, rekap per materi,
 * dan pembahasan kunci jawaban (FR-26).
 */
export default function ResultPage() {
  const navigate = useNavigate()
  const { paket, nama, jawaban, resetSesi } = useExam()
  const [pembahasanTerbuka, setPembahasanTerbuka] = useState(false)

  const hasil = useMemo(() => hitungHasil(paket, jawaban), [paket, jawaban])

  function ulangi() {
    resetSesi('')
    navigate('/')
  }

  return (
    <main className="min-h-full p-4">
      <div className="mx-auto w-full max-w-2xl space-y-4">
        {/* Kartu skor utama */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-garis">
          <div className="bg-jingga px-8 py-6 text-center text-white">
            <p className="text-sm font-semibold opacity-90">HASIL TRY OUT</p>
            <h1 className="mt-1 text-2xl font-extrabold">Try Out OSN IPS SD</h1>
            {nama && <p className="mt-1 text-white/90">Peserta: {nama}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4 p-6">
            <div className="rounded-2xl bg-jingga-lembut p-5 text-center">
              <p className="text-sm font-semibold text-tinta/60">Skor Mentah</p>
              <p className="mt-1 text-4xl font-extrabold text-jingga-tua">
                {hasil.skorMentah}
              </p>
              <p className="text-sm text-tinta/50">dari {hasil.totalSoal} benar</p>
            </div>
            <div className="rounded-2xl bg-kuning-lembut p-5 text-center">
              <p className="text-sm font-semibold text-tinta/60">
                Nilai Berbobot
              </p>
              <p className="mt-1 text-4xl font-extrabold text-tinta">
                {hasil.nilaiBerbobot}
              </p>
              <p className="text-sm text-tinta/50">
                maks {hasil.nilaiBerbobotMaks}
              </p>
            </div>
          </div>
        </div>

        {/* Rekap per jenis soal */}
        <div className="grid gap-4 sm:grid-cols-2">
          <KartuRekap
            judul={`Pilihan Ganda (${hasil.rekapPg.total})`}
            rekap={hasil.rekapPg}
          />
          <KartuRekap
            judul={`Isian Singkat (${hasil.rekapIsian.total})`}
            rekap={hasil.rekapIsian}
          />
        </div>

        {/* Rekap per materi */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-garis">
          <h2 className="font-bold text-tinta">Rekap per Materi</h2>
          <div className="mt-3 space-y-3">
            {hasil.perMateri.map((m) => {
              const persen = Math.round((m.benar / m.total) * 100)
              return (
                <div key={m.materi}>
                  <div className="flex justify-between text-sm">
                    <span className="text-tinta">{m.materi}</span>
                    <span className="font-semibold text-tinta/70">
                      {m.benar}/{m.total}
                    </span>
                  </div>
                  <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-garis">
                    <div
                      className="h-full rounded-full bg-jingga"
                      style={{ width: `${persen}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pembahasan kunci jawaban */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-garis">
          <button
            onClick={() => setPembahasanTerbuka((v) => !v)}
            className="flex w-full items-center justify-between"
          >
            <h2 className="font-bold text-tinta">Pembahasan (Kunci Jawaban)</h2>
            <span className="text-sm font-semibold text-jingga-tua">
              {pembahasanTerbuka ? 'Sembunyikan ▲' : 'Tampilkan ▼'}
            </span>
          </button>

          {pembahasanTerbuka && (
            <ol className="mt-4 space-y-3">
              {hasil.detail.map((d) => (
                <li
                  key={d.soal.id}
                  className="rounded-xl border border-garis p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-tinta">
                      No. {d.nomor}. {d.soal.pertanyaan}
                    </p>
                    <LencanaStatus benar={d.benar} kosong={d.kosong} />
                  </div>
                  <div className="mt-2 space-y-1 text-sm">
                    <p>
                      <span className="text-tinta/50">Jawabanmu: </span>
                      <span
                        className={
                          d.kosong
                            ? 'italic text-tinta/40'
                            : d.benar
                              ? 'font-semibold text-sukses'
                              : 'font-semibold text-bahaya'
                        }
                      >
                        {d.kosong ? '(kosong)' : d.jawaban}
                      </span>
                    </p>
                    <p>
                      <span className="text-tinta/50">Kunci: </span>
                      <span className="font-semibold text-tinta">
                        {d.kunciTampil}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>

        <button
          onClick={ulangi}
          className="w-full rounded-xl bg-jingga px-6 py-4 text-lg font-bold text-white shadow-md transition hover:bg-jingga-tua active:scale-[0.99]"
        >
          Ulangi Try Out
        </button>
      </div>
    </main>
  )
}

function KartuRekap({ judul, rekap }: { judul: string; rekap: RekapJenis }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-garis">
      <h2 className="font-bold text-tinta">{judul}</h2>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-sukses/10 py-2">
          <p className="text-2xl font-extrabold text-sukses">{rekap.benar}</p>
          <p className="text-xs text-tinta/60">Benar</p>
        </div>
        <div className="rounded-xl bg-bahaya/10 py-2">
          <p className="text-2xl font-extrabold text-bahaya">{rekap.salah}</p>
          <p className="text-xs text-tinta/60">Salah</p>
        </div>
        <div className="rounded-xl bg-garis/60 py-2">
          <p className="text-2xl font-extrabold text-tinta/60">{rekap.kosong}</p>
          <p className="text-xs text-tinta/60">Kosong</p>
        </div>
      </div>
    </div>
  )
}

function LencanaStatus({ benar, kosong }: { benar: boolean; kosong: boolean }) {
  if (benar)
    return (
      <span className="shrink-0 rounded-full bg-sukses px-2.5 py-1 text-xs font-bold text-white">
        Benar
      </span>
    )
  if (kosong)
    return (
      <span className="shrink-0 rounded-full bg-garis px-2.5 py-1 text-xs font-bold text-tinta/60">
        Kosong
      </span>
    )
  return (
    <span className="shrink-0 rounded-full bg-bahaya px-2.5 py-1 text-xs font-bold text-white">
      Salah
    </span>
  )
}
