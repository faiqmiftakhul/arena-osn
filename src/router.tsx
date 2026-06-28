import { createBrowserRouter } from 'react-router-dom'
import StartPage from './pages/StartPage'
import ExamPage from './pages/ExamPage'
import ResultPage from './pages/ResultPage'

/**
 * Routing 3 layar (PRD §6):
 *   /        → Halaman Mulai
 *   /ujian   → Halaman Pengerjaan
 *   /hasil   → Halaman Hasil
 */
export const router = createBrowserRouter(
  [
    { path: '/', element: <StartPage /> },
    { path: '/ujian', element: <ExamPage /> },
    { path: '/hasil', element: <ResultPage /> },
  ],
  // Cocokkan dengan `base` di vite.config.ts (sub-path GitHub Pages)
  { basename: import.meta.env.BASE_URL },
)
