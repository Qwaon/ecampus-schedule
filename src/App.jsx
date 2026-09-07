import { useState, useEffect } from 'react'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import HomePage from './components/HomePage'
import SchedulePage from './components/SchedulePage'
import SessionsPage from './components/SessionsPage'
import { useSchedule } from './hooks/useSchedule'
import { useLessonNotifications } from './hooks/useLessonNotifications'

const NOTIFICATIONS_KEY = 'notificationsEnabled'

export default function App() {
  const [page, setPage] = useState('home')
  const { data, error } = useSchedule()

  const [notificationsOn, setNotificationsOn] = useState(() => {
    return (
      typeof Notification !== 'undefined' &&
      Notification.permission === 'granted' &&
      localStorage.getItem(NOTIFICATIONS_KEY) === '1'
    )
  })

  useLessonNotifications(data?.weeks, notificationsOn)

  async function toggleNotifications() {
    if (typeof Notification === 'undefined') return

    if (notificationsOn) {
      setNotificationsOn(false)
      localStorage.setItem(NOTIFICATIONS_KEY, '0')
      return
    }

    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      setNotificationsOn(true)
      localStorage.setItem(NOTIFICATIONS_KEY, '1')
    }
  }

  useEffect(() => {
    document.documentElement.removeAttribute('data-theme')
  }, [])

  return (
    <div className="app">
      <Header notificationsOn={notificationsOn} onToggleNotifications={toggleNotifications} />

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
