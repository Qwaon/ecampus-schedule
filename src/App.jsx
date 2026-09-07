import { useState, useEffect } from 'react'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import HomePage from './components/HomePage'
import SchedulePage from './components/SchedulePage'
import SessionsPage from './components/SessionsPage'
import { useSchedule } from './hooks/useSchedule'

export default function App() {
  const [page, setPage] = useState('home')
  const [darkMode, setDarkMode] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
  const { data, error } = useSchedule()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <div className="app">
      <Header darkMode={darkMode} onToggleDark={() => setDarkMode((d) => !d)} />

      <main className="main">
        {error && (
          <div className="home-empty" style={{ minHeight: '50dvh' }}>
            <p className="home-empty-title">Не удалось загрузить расписание</p>
            <p className="home-empty-sub">{String(error.message || error)}</p>
          </div>
        )}

        {!error && !data && (
          <div className="home-empty" style={{ minHeight: '50dvh' }}>
            <p className="home-empty-title">Загрузка…</p>
          </div>
        )}

        {data && (
          <div className="fade-in" key={page}>
            {page === 'home' && <HomePage weeks={data.weeks} />}
            {page === 'schedule' && <SchedulePage weeks={data.weeks} />}
            {page === 'sessions' && <SessionsPage sessions={data.sessions} />}
          </div>
        )}
      </main>

      <BottomNav active={page} onSelect={setPage} />
    </div>
  )
}
