import type { Soal } from '../types'
import Ilustrasi from './Ilustrasi'

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

/** Stimulus gambar/peta: SVG buatan atau deskripsi kalimat. */
function Gambar({ gambar }: { gambar: NonNullable<Soal['gambar']> }) {
  return (
    <figure className="mt-4 overflow-hidden rounded-xl border border-garis bg-slate-50">
      {gambar.jenis === 'svg' && gambar.svgId ? (
        <div className="flex justify-center bg-white p-3">
          <Ilustrasi id={gambar.svgId} />
        </div>
      ) : (
        <div className="flex gap-3 p-4">
          <span aria-hidden="true" className="text-2xl">🖼️</span>
          <p className="text-sm italic leading-relaxed text-tinta/80">
            <span className="font-semibold not-italic text-tinta">Deskripsi gambar: </span>
            {gambar.deskripsi}
          </p>
        </div>
      )}
      {gambar.jenis === 'svg' && gambar.deskripsi && (
        <figcaption className="border-t border-garis px-4 py-2 text-xs text-tinta/70">
          {gambar.deskripsi}
        </figcaption>
      )}
    </figure>
  )
}

/** Stimulus daftar pernyataan, rapi ke bawah. */
function DaftarPernyataan({ items }: { items: NonNullable<Soal['pernyataan']> }) {
  return (
    <ol className="mt-4 space-y-2 rounded-xl bg-slate-50 p-4 ring-1 ring-garis">
      {items.map((it) => (
        <li key={it.label} className="flex gap-2.5 text-tinta">
          <span className="font-bold text-jingga-tua">({it.label})</span>
          <span className="leading-relaxed">{it.teks}</span>
        </li>
      ))}
    </ol>
  )
}

/** Stimulus tabel. */
function Tabel({ tabel }: { tabel: NonNullable<Soal['tabel']> }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-garis">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-jingga-lembut">
            {tabel.kolom.map((k) => (
              <th key={k} className="border-b border-garis px-3 py-2 font-bold text-tinta">
                {k}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tabel.baris.map((baris, i) => (
            <tr key={i} className={i % 2 ? 'bg-white' : 'bg-slate-50'}>
              {baris.map((sel, j) => (
                <td key={j} className="border-b border-garis px-3 py-2 align-top leading-relaxed text-tinta">
                  {sel}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
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

      {soal.pengantar && (
        <p className="mt-4 leading-relaxed text-tinta/90">{soal.pengantar}</p>
      )}

      {soal.gambar && <Gambar gambar={soal.gambar} />}
      {soal.tabel && <Tabel tabel={soal.tabel} />}
      {soal.pernyataan && <DaftarPernyataan items={soal.pernyataan} />}

      <p className="mt-4 text-lg font-medium leading-relaxed text-tinta">
        {soal.pertanyaan}
      </p>

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
