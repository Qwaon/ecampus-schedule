export default function DayTabs({ days, activeDate, onSelect, todayYmd }) {
  return (
    <nav className="day-tabs">
      {days.map((day) => {
        const ymd = day.date.slice(0, 10)
        const dateNum = Number(ymd.slice(8, 10))
        return (
          <button
            key={ymd}
            className={[
              'day-tab',
              activeDate === ymd ? 'day-tab--active' : '',
              todayYmd === ymd ? 'day-tab--today' : '',
            ].join(' ')}
            onClick={() => onSelect(ymd)}
          >
            <span className="day-tab-full">{day.weekday.slice(0, 2)}</span>
            <span className="day-tab-short">{dateNum}</span>
            {todayYmd === ymd && <span className="today-dot" />}
          </button>
        )
      })}
    </nav>
  )
}
