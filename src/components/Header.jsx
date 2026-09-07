// SF Symbols: bell
const IconBell = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

// SF Symbols: bell.slash
const IconBellOff = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.7 3a6 6 0 0 1 9.3 5c0 4.2 1 6.6 1.9 7.9" />
    <path d="M18 15c-1-1.5-1-3.5-1-3.5" />
    <path d="M6.3 6.3C6.1 6.9 6 7.5 6 8c0 7-3 9-3 9h13" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    <path d="M3 3l18 18" />
  </svg>
)

export default function Header({ notificationsOn, onToggleNotifications }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-title">
          <h1>Расписание</h1>
        </div>

        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={onToggleNotifications}
            aria-label={notificationsOn ? 'Выключить уведомления' : 'Включить уведомления'}
            aria-pressed={notificationsOn}
          >
            {notificationsOn ? <IconBell /> : <IconBellOff />}
          </button>
        </div>
      </div>
    </header>
  )
}
