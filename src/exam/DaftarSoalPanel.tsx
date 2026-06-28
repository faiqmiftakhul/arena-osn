import type { Soal } from '../types'

interface Props {
  soal: Soal[]
  indexAktif: number
  jawaban: Record<number, string>
  ragu: Set<number>
  onPilih: (index: number) => void
  onTutup: () => void
  onSelesai: () => void
}

type Status = 'aktif' | 'ragu' | 'terjawab' | 'kosong'

function statusSoal(
  s: Soal,
  index: number,
  indexAktif: number,
  jawaban: Record<number, string>,
  ragu: Set<number>,
): Status {
  if (index === indexAktif) return 'aktif'
  if (ragu.has(s.id)) return 'ragu'
  const j = jawaban[s.id]
  if (j != null && j.trim() !== '') return 'terjawab'
  return 'kosong'
}

const GAYA: Record<Status, string> = {
  aktif: 'bg-white text-jingga-tua ring-2 ring-jingga ring-offset-2',
  ragu: 'bg-kuning text-tinta',
  terjawab: 'bg-sukses text-white',
  kosong: 'bg-white text-tinta/70 ring-1 ring-garis',
}

/** Panel Daftar Soal (PRD §7.5, FR-16..20). */
export default function DaftarSoalPanel({
  soal,
  indexAktif,
  jawaban,
  ragu,
  onPilih,
  onTutup,
  onSelesai,
}: Props) {
  const pg = soal.map((s, i) => ({ s, i })).filter(({ s }) => s.tipe === 'pg')
  const isian = soal
    .map((s, i) => ({ s, i }))
    .filter(({ s }) => s.tipe === 'isian')

  const Tombol = ({ s, i }: { s: Soal; i: number }) => {
    const status = statusSoal(s, i, indexAktif, jawaban, ragu)
    const terjawab = jawaban[s.id] != null && jawaban[s.id].trim() !== ''
    return (
      <button
        onClick={() => onPilih(i)}
        className={`relative h-11 rounded-lg text-sm font-bold transition hover:brightness-95 ${GAYA[status]}`}
        title={`Soal ${i + 1}`}
      >
        {i + 1}
        {status === 'ragu' && (
          <span className="absolute -right-1 -top-1 text-xs">★</span>
        )}
        {status === 'ragu' && terjawab && (
          <span className="absolute -bottom-1 -right-1 text-[10px] text-sukses">
            ●
          </span>
        )}
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-30 flex">
      {/* Latar gelap */}
      <button
        className="absolute inset-0 bg-black/40"
        onClick={onTutup}
        aria-label="Tutup daftar soal"
      />

      {/* Panel */}
      <div className="relative ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-2xl sm:rounded-l-3xl">
        <div className="flex items-center justify-between border-b border-garis bg-jingga px-5 py-4 text-white sm:rounded-tl-3xl">
          <h2 className="text-lg font-bold">Daftar Soal</h2>
          <button
            onClick={onTutup}
            className="rounded-lg bg-white/15 px-3 py-1.5 text-sm font-semibold hover:bg-white/25"
          >
            ✕ Tutup
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {/* Legenda */}
          <div className="flex flex-wrap gap-3 text-xs text-tinta/70">
            <span className="flex items-center gap-1.5">
              <i className="inline-block h-4 w-4 rounded bg-white ring-1 ring-garis" />
              Belum
            </span>
            <span className="flex items-center gap-1.5">
              <i className="inline-block h-4 w-4 rounded bg-sukses" /> Terjawab
            </span>
            <span className="flex items-center gap-1.5">
              <i className="inline-block h-4 w-4 rounded bg-kuning" /> Ragu-ragu
            </span>
            <span className="flex items-center gap-1.5">
              <i className="inline-block h-4 w-4 rounded bg-white ring-2 ring-jingga" />
              Aktif
            </span>
          </div>

          {/* Pilihan Ganda */}
          <h3 className="mt-5 text-sm font-bold text-tinta">
            Pilihan Ganda (1–{pg.length})
          </h3>
          <div className="mt-2 grid grid-cols-6 gap-2">
            {pg.map(({ s, i }) => (
              <Tombol key={s.id} s={s} i={i} />
            ))}
          </div>

          {/* Isian Singkat */}
          <h3 className="mt-6 text-sm font-bold text-tinta">
            Isian Singkat ({pg.length + 1}–{pg.length + isian.length})
          </h3>
          <div className="mt-2 grid grid-cols-6 gap-2">
            {isian.map(({ s, i }) => (
              <Tombol key={s.id} s={s} i={i} />
            ))}
          </div>
        </div>

        <div className="border-t border-garis p-4">
          <button
            onClick={onSelesai}
            className="w-full rounded-xl bg-sukses px-6 py-3 font-bold text-white hover:brightness-95"
          >
            Selesai & Kumpulkan
          </button>
        </div>
      </div>
    </div>
  )
}
