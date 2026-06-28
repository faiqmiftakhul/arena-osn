import type { ReactElement } from 'react'

/**
 * Kumpulan ilustrasi/peta buatan sendiri (SVG) untuk soal yang membutuhkan
 * gambar. Dipetakan lewat `gambar.svgId` pada data soal. Bila sebuah soal
 * butuh gambar tetapi sulit digambar ulang, gunakan `jenis: 'deskripsi'`
 * pada data soal (bukan komponen di sini).
 */

/** Mata angin kecil (Utara di atas). */
function Kompas({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} aria-hidden="true">
      <circle cx="0" cy="0" r="16" fill="#fff" stroke="#94a3b8" />
      <path d="M0 -12 L4 2 L0 -1 L-4 2 Z" fill="#dc2626" />
      <text x="0" y="-18" textAnchor="middle" fontSize="9" fill="#475569" fontWeight="700">
        U
      </text>
    </g>
  )
}

/** Peta skematik kawasan sekitar Singapura dengan penanda X (soal no. 3). */
function PetaSingapura() {
  return (
    <svg viewBox="0 0 400 280" className="h-auto w-full max-w-md" role="img"
      aria-label="Peta skematik kawasan sekitar Singapura. Tanda X menunjuk daratan besar di sebelah utara Singapura.">
      <rect x="0" y="0" width="400" height="280" fill="#cfe8f3" />
      {/* Daratan besar di utara (tanda X) */}
      <path d="M0 0 H400 V95 Q320 120 250 100 Q180 80 110 105 Q50 125 0 100 Z" fill="#bfe3b4" stroke="#7bbf6a" />
      <text x="200" y="55" textAnchor="middle" fontSize="34" fontWeight="800" fill="#dc2626">✕</text>
      {/* Selat Johor (garis air sempit) */}
      {/* Pulau Singapura */}
      <ellipse cx="205" cy="150" rx="55" ry="22" fill="#f6d99a" stroke="#d6a64a" />
      <text x="205" y="154" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7a5a12">Singapura</text>
      {/* Kepulauan Indonesia (Riau/Batam) di selatan */}
      <ellipse cx="120" cy="225" rx="38" ry="16" fill="#bfe3b4" stroke="#7bbf6a" />
      <ellipse cx="250" cy="235" rx="46" ry="18" fill="#bfe3b4" stroke="#7bbf6a" />
      <text x="185" y="262" textAnchor="middle" fontSize="10" fill="#3f6b34">Kepulauan Indonesia (Batam–Bintan)</text>
      <Kompas x={365} y={35} />
    </svg>
  )
}

/** Peta skematik Pulau Sumatera, dibagi 4 zona bernomor (soal no. 35). */
function PetaSumatera() {
  return (
    <svg viewBox="0 0 320 360" className="h-auto w-full max-w-xs" role="img"
      aria-label="Peta skematik Pulau Sumatera membentang dari nomor 1 di selatan hingga nomor 4 di ujung utara (Aceh).">
      <rect x="0" y="0" width="320" height="360" fill="#cfe8f3" />
      {/* Siluet Sumatera membentang barat-laut (atas) ke tenggara (bawah) */}
      <path
        d="M70 330 Q60 300 90 270 Q120 240 130 205 Q140 170 165 140 Q185 115 195 80 Q205 50 235 35 Q260 25 270 45 Q272 70 245 95 Q225 120 215 155 Q205 195 180 225 Q155 255 140 290 Q128 320 110 338 Q88 350 70 330 Z"
        fill="#bfe3b4" stroke="#5a9a4a" strokeWidth="2"
      />
      {/* Penanda zona 1 (selatan) .. 4 (utara/Aceh) */}
      <g fontSize="15" fontWeight="800" textAnchor="middle">
        <circle cx="92" cy="312" r="14" fill="#fff" stroke="#dc2626" strokeWidth="2" />
        <text x="92" y="317" fill="#dc2626">1</text>
        <circle cx="150" cy="235" r="14" fill="#fff" stroke="#dc2626" strokeWidth="2" />
        <text x="150" y="240" fill="#dc2626">2</text>
        <circle cx="195" cy="150" r="14" fill="#fff" stroke="#dc2626" strokeWidth="2" />
        <text x="195" y="155" fill="#dc2626">3</text>
        <circle cx="245" cy="62" r="14" fill="#fff" stroke="#dc2626" strokeWidth="2" />
        <text x="245" y="67" fill="#dc2626">4</text>
      </g>
      <Kompas x={290} y={35} />
    </svg>
  )
}

/** Penampang skematik terasering bertingkat sempit pada lereng (soal no. 43). */
function Terasering() {
  return (
    <svg viewBox="0 0 400 240" className="h-auto w-full max-w-md" role="img"
      aria-label="Penampang lereng dengan terasering bertingkat-tingkat sempit dari puncak ke bawah.">
      <rect x="0" y="0" width="400" height="240" fill="#eaf6ff" />
      {/* Matahari */}
      <circle cx="350" cy="40" r="20" fill="#ffd166" />
      {/* Tangga terasering: anak tangga sempit menurun curam */}
      <g fill="#9bd17a" stroke="#6aa84f">
        {Array.from({ length: 7 }).map((_, i) => {
          const lebar = 46
          const tinggi = 24
          const x = 40 + i * lebar
          const y = 70 + i * tinggi
          return (
            <g key={i}>
              <rect x={x} y={y} width={lebar + 2} height={tinggi} />
              {/* Genangan air tipis di tiap teras */}
              <rect x={x} y={y} width={lebar + 2} height={6} fill="#7ec8e3" stroke="none" />
            </g>
          )
        })}
      </g>
      {/* Tanah dasar */}
      <rect x="0" y="238" width="400" height="2" fill="#6aa84f" />
      <text x="60" y="60" fontSize="11" fill="#475569" fontWeight="700">Puncak lereng</text>
    </svg>
  )
}

const PETA: Record<string, () => ReactElement> = {
  'peta-singapura': PetaSingapura,
  'peta-sumatera': PetaSumatera,
  terasering: Terasering,
}

/** Render ilustrasi SVG berdasarkan id; null bila id tidak dikenal. */
export default function Ilustrasi({ id }: { id: string }): ReactElement | null {
  const Komponen = PETA[id]
  return Komponen ? <Komponen /> : null
}
