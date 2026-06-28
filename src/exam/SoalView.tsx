import type { Soal } from '../types'

const LABEL_TIPE: Record<Soal['tipe'], string> = {
  pg: 'Pilihan Ganda',
  isian: 'Isian Singkat',
}

interface Props {
  soal: Soal
  nomor: number // nomor urut tampil (1..52)
  jawaban: string | undefined
  ragu: boolean
  onJawab: (nilai: string) => void
}

/** Render satu soal aktif: radio button untuk PG, input teks untuk isian (PRD §7.3). */
export default function SoalView({ soal, nomor, jawaban, ragu, onJawab }: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-garis">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-jingga-lembut px-3 py-1 text-sm font-semibold text-jingga-tua">
          Soal No. {nomor} · {LABEL_TIPE[soal.tipe]}
        </span>
        {ragu && (
          <span className="rounded-full bg-kuning-muda px-3 py-1 text-sm font-semibold text-tinta">
            ★ Ditandai ragu-ragu
          </span>
        )}
      </div>

      <p className="mt-4 text-lg leading-relaxed text-tinta">{soal.pertanyaan}</p>

      {soal.tipe === 'pg' ? (
        <fieldset className="mt-5 space-y-3">
          <legend className="sr-only">Pilih satu jawaban</legend>
          {soal.opsi.map((opsi) => {
            const terpilih = jawaban === opsi.kode
            return (
              <label
                key={opsi.kode}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition ${
                  terpilih
                    ? 'border-jingga bg-jingga-lembut'
                    : 'border-garis bg-white hover:border-jingga/40 hover:bg-jingga-lembut/40'
                }`}
              >
                <input
                  type="radio"
                  name={`soal-${soal.id}`}
                  value={opsi.kode}
                  checked={terpilih}
                  onChange={() => onJawab(opsi.kode)}
                  className="mt-1 h-5 w-5 accent-[var(--color-jingga)]"
                />
                <span className="text-tinta">
                  <span className="font-bold">{opsi.kode}.</span> {opsi.teks}
                </span>
              </label>
            )
          })}
        </fieldset>
      ) : (
        <div className="mt-5">
          <label className="block text-sm font-semibold text-tinta/70">
            Ketik jawabanmu:
          </label>
          <input
            type="text"
            value={jawaban ?? ''}
            onChange={(e) => onJawab(e.target.value)}
            placeholder="Tulis jawaban singkat di sini"
            className="mt-2 w-full rounded-xl border-2 border-garis bg-white px-4 py-3 text-tinta outline-none focus:border-jingga focus:ring-2 focus:ring-jingga/30"
          />
        </div>
      )}
    </div>
  )
}
