import { useState } from 'react'

const TYPE_BADGE = {
  'экзамен': { cls: 'badge--lecture' },
  'зачет': { cls: 'badge--practice' },
  'другое': { cls: 'badge--practice' },
}

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
}

function RecordRow({ record }) {
  const badge = TYPE_BADGE[record.type]
  return (
    <div className="lesson-card">
      <div className="lesson-body">
        <div className="lesson-subject-row">
          <span className="lesson-subject">{record.subject}</span>
          {badge && <span className={`lesson-badge ${badge.cls}`}>{record.work_kind}</span>}
        </div>
        {record.teacher && (
          <div className="lesson-teacher"><span>{record.teacher}</span></div>
        )}
        <div className="lesson-room">
          <span>
            {record.mark || 'без оценки'}
            {record.date ? ` · ${formatDate(record.date)}` : ''}
          </span>
        </div>
      </div>
    </div>
  )
}

function TermBlock({ term, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="term-block">
      <button className="term-block-header" onClick={() => setOpen((o) => !o)}>
        <span className="term-block-title">{term.study_year} · {term.term}</span>
        <span className="term-block-count">{term.records.length}</span>
      </button>
      {open && (
        <div className="lessons-list fade-in">
          {term.records.map((record, i) => (
            <RecordRow key={i} record={record} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function SessionsPage({ sessions }) {
  if (!sessions || sessions.length === 0) {
    return (
      <div className="home-empty" style={{ minHeight: '50dvh' }}>
        <p className="home-empty-title">Данных нет</p>
        <p className="home-empty-sub">Экзамены и зачёты ещё не загружены</p>
      </div>
    )
  }

  const lastIndex = sessions.length - 1

  return (
    <div className="schedule-page">
      <div className="schedule-day-heading">
        <span className="schedule-day-name">Сессия</span>
      </div>
      <div className="term-blocks">
        {sessions.map((term, i) => (
          <TermBlock key={i} term={term} defaultOpen={i === lastIndex} />
        ))}
      </div>
    </div>
  )
}
