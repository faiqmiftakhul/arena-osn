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

/** Peta skematik persebaran fauna Indonesia: garis Wallace & Weber, tanda X di wilayah tengah (Paket 2 no. 3). */
function PetaFaunaIndonesia() {
  return (
    <svg viewBox="0 0 460 240" className="h-auto w-full max-w-lg" role="img"
      aria-label="Peta persebaran fauna Indonesia dengan garis Wallace dan Weber; tanda X berada di wilayah tengah.">
      <rect x="0" y="0" width="460" height="240" fill="#cfe8f3" />
      {/* Wilayah barat (Asiatis): Sumatera, Kalimantan, Jawa */}
      <g fill="#bfe3b4" stroke="#7bbf6a">
        <ellipse cx="55" cy="95" rx="38" ry="20" transform="rotate(-30 55 95)" />
        <ellipse cx="120" cy="80" rx="44" ry="30" />
        <ellipse cx="95" cy="160" rx="40" ry="13" />
      </g>
      {/* Wilayah tengah (Peralihan): Sulawesi + tanda X */}
      <path d="M250 60 q15 25 0 45 q20 10 12 35 q-18 5 -22 -12 q-14 8 -20 -6 q12 -10 6 -26 q-16 -2 -8 -18 q18 4 22 -10 q14 -6 10 18 Z"
        fill="#f7d488" stroke="#d6a64a" />
      <text x="247" y="100" textAnchor="middle" fontSize="30" fontWeight="800" fill="#dc2626">✕</text>
      {/* Wilayah timur (Australis): Papua */}
      <path d="M360 70 q50 -10 80 20 q-10 25 -45 22 q-30 8 -45 -12 q5 -22 10 -30 Z"
        fill="#bfe3b4" stroke="#7bbf6a" />
      {/* Garis Wallace (antara barat & tengah) */}
      <line x1="190" y1="20" x2="200" y2="220" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="8 5" />
      <text x="160" y="232" fontSize="11" fontWeight="700" fill="#dc2626">Garis Wallace</text>
      {/* Garis Weber (antara tengah & timur) */}
      <line x1="320" y1="20" x2="330" y2="220" stroke="#1d4ed8" strokeWidth="2.5" strokeDasharray="8 5" />
      <text x="300" y="16" fontSize="11" fontWeight="700" fill="#1d4ed8">Garis Weber</text>
      {/* Label zona */}
      <text x="70" y="200" fontSize="11" fill="#3f6b34" fontWeight="700">Barat</text>
      <text x="240" y="200" fontSize="11" fill="#8a6a1a" fontWeight="700">Tengah</text>
      <text x="395" y="135" fontSize="11" fill="#3f6b34" fontWeight="700">Timur</text>
      <Kompas x={430} y={30} />
    </svg>
  )
}

/** Peta skematik Pulau Jawa membentang barat–timur, 4 penanda bernomor (Paket 2 no. 35). */
function PetaJawa() {
  return (
    <svg viewBox="0 0 460 200" className="h-auto w-full max-w-lg" role="img"
      aria-label="Peta Pulau Jawa membentang dari nomor 1 di ujung barat sampai nomor 4 di ujung timur.">
      <rect x="0" y="0" width="460" height="200" fill="#cfe8f3" />
      {/* Siluet Jawa memanjang barat-timur */}
      <path
        d="M30 110 Q70 80 120 92 Q170 100 220 88 Q280 74 330 92 Q390 110 430 96 Q436 120 410 132 Q350 150 290 134 Q230 122 175 138 Q120 152 70 140 Q34 132 30 110 Z"
        fill="#bfe3b4" stroke="#5a9a4a" strokeWidth="2"
      />
      {/* Penanda 1 (barat) .. 4 (timur) */}
      <g fontSize="15" fontWeight="800" textAnchor="middle">
        <circle cx="78" cy="116" r="14" fill="#fff" stroke="#dc2626" strokeWidth="2" />
        <text x="78" y="121" fill="#dc2626">1</text>
        <circle cx="190" cy="112" r="14" fill="#fff" stroke="#dc2626" strokeWidth="2" />
        <text x="190" y="117" fill="#dc2626">2</text>
        <circle cx="300" cy="112" r="14" fill="#fff" stroke="#dc2626" strokeWidth="2" />
        <text x="300" y="117" fill="#dc2626">3</text>
        <circle cx="398" cy="116" r="14" fill="#fff" stroke="#dc2626" strokeWidth="2" />
        <text x="398" y="121" fill="#dc2626">4</text>
      </g>
      <text x="36" y="170" fontSize="10" fill="#3f6b34" fontWeight="700">Barat</text>
      <text x="408" y="170" fontSize="10" fill="#3f6b34" fontWeight="700">Timur</text>
      <Kompas x={432} y={30} />
    </svg>
  )
}

/** Skema siklus air: penguapan laut → awan → hujan (Paket 2 no. 43). */
function SiklusAir() {
  return (
    <svg viewBox="0 0 420 240" className="h-auto w-full max-w-md" role="img"
      aria-label="Skema siklus air: panas matahari menguapkan air laut menjadi uap yang naik membentuk awan, lalu turun sebagai hujan.">
      <rect x="0" y="0" width="420" height="240" fill="#eaf6ff" />
      {/* Matahari */}
      <circle cx="370" cy="42" r="22" fill="#ffd166" />
      <g stroke="#ffb703" strokeWidth="3">
        <line x1="370" y1="8" x2="370" y2="0" /><line x1="336" y1="42" x2="328" y2="42" />
        <line x1="346" y1="18" x2="340" y2="12" /><line x1="346" y1="66" x2="340" y2="72" />
      </g>
      {/* Awan */}
      <g fill="#ffffff" stroke="#cbd5e1">
        <ellipse cx="150" cy="55" rx="46" ry="26" />
        <ellipse cx="110" cy="62" rx="30" ry="20" />
        <ellipse cx="190" cy="62" rx="30" ry="20" />
      </g>
      {/* Laut */}
      <rect x="0" y="185" width="420" height="55" fill="#7ec8e3" />
      <path d="M0 185 q30 -8 60 0 t60 0 t60 0 t60 0 t60 0 t60 0" fill="none" stroke="#5aa6c7" strokeWidth="2" />
      {/* Panah penguapan (naik) */}
      <g stroke="#1d4ed8" strokeWidth="3" fill="none">
        <path d="M250 180 C250 140 240 110 200 88" markerEnd="url(#mpanah)" />
        <path d="M300 182 C305 150 300 120 195 80" markerEnd="url(#mpanah)" />
      </g>
      <text x="300" y="135" fontSize="12" fill="#1d4ed8" fontWeight="700">penguapan</text>
      {/* Hujan (turun) */}
      <g stroke="#1d4ed8" strokeWidth="2.5">
        <line x1="120" y1="90" x2="112" y2="120" /><line x1="140" y1="92" x2="132" y2="124" />
        <line x1="160" y1="92" x2="152" y2="124" /><line x1="180" y1="90" x2="172" y2="120" />
      </g>
      <text x="92" y="150" fontSize="12" fill="#1d4ed8" fontWeight="700">hujan</text>
      <text x="20" y="215" fontSize="12" fill="#0c5670" fontWeight="700">Laut</text>
      <defs>
        <marker id="mpanah" markerWidth="9" markerHeight="9" refX="5" refY="4" orient="auto">
          <path d="M0 0 L9 4 L0 8 Z" fill="#1d4ed8" />
        </marker>
      </defs>
    </svg>
  )
}

const PETA: Record<string, () => ReactElement> = {
  'peta-singapura': PetaSingapura,
  'peta-sumatera': PetaSumatera,
  terasering: Terasering,
  'peta-fauna-indonesia': PetaFaunaIndonesia,
  'peta-jawa': PetaJawa,
  'siklus-air': SiklusAir,
}

/** Render ilustrasi SVG berdasarkan id; null bila id tidak dikenal. */
export default function Ilustrasi({ id }: { id: string }): ReactElement | null {
  const Komponen = PETA[id]
  return Komponen ? <Komponen /> : null
}
