import { useState } from 'react'

// Текущий (9-й) семестр ещё идёт — на портале нет записи в зачётке, пока
// не сданы экзамены/зачёты. Список предметов и их формы аттестации введены
// вручную со скриншота раздела "Предметы" в приложении eCampus.
const CURRENT_TERM = {
  study_year: '5 курс',
  term: '9 семестр',
  records: [
    { subject: 'Аттестация объектов информатизации на соответствие требованиям по защите информации', work_kind: 'Зачет', teacher: 'Медведева Анна Сергеевна' },
    { subject: 'Измерения в телекоммуникационных системах', work_kind: 'Дифференцированный зачет', teacher: 'к.т.н. Яковлев Сергей Владимирович' },
    { subject: 'Обеспечение информационной безопасности на объектах критической информационной инфраструктуры', work_kind: 'Зачет', teacher: 'к.т.н. Пелешенко Виктор Сергеевич' },
    { subject: 'Организационное и правовое обеспечение информационной безопасности', work_kind: 'Экзамен', teacher: 'Чайка Елена Аркадьевна' },
    { subject: 'Организация защиты конфиденциальной информации на объектах информатизации', work_kind: 'Экзамен', teacher: 'Ржевская Наталья Витальевна' },
    { subject: 'Практикум по построению защищенных виртуальных частных сетей', work_kind: 'Дифференцированный зачет', teacher: 'к.т.н. Самус Михаил Владимирович' },
    { subject: 'Проектирование средств и систем информатизации в защищенном исполнении', work_kind: 'Экзамен', teacher: 'Луценко Владислав Вячеславович' },
    { subject: 'Цифровая обработка сигналов', work_kind: 'Дифференцированный зачет', teacher: 'к.т.н. Ляхов Алексей Владимирович' },
  ],
}

function badgeClassFor(workKind) {
  const k = (workKind || '').toLowerCase()
  if (k.includes('дифференцированн')) return 'badge--diff-credit'
  if (k.includes('экзамен')) return 'badge--exam'
  if (k.includes('зачет') || k.includes('зачёт')) return 'badge--credit'
  return 'badge--practice'
}

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
}

function RecordRow({ record }) {
  const cls = badgeClassFor(record.work_kind)
  return (
    <div className="lesson-card">
      <div className="lesson-body">
        <div className="lesson-subject-row">
          <span className="lesson-subject">{record.subject}</span>
        </div>
        <span className={`lesson-badge ${cls}`} style={{ alignSelf: 'flex-start' }}>{record.work_kind}</span>
        {record.teacher && (
          <div className="lesson-teacher"><span>{record.teacher}</span></div>
        )}
        {(record.mark || record.date) && (
          <div className="lesson-room">
            <span>
              {record.mark || ''}
              {record.mark && record.date ? ' · ' : ''}
              {record.date ? formatDate(record.date) : ''}
            </span>
          </div>
        )}
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
  const past = sessions || []

  return (
    <div className="schedule-page">
      <div className="schedule-day-heading">
        <span className="schedule-day-name">Сессия</span>
      </div>

      <div className="term-blocks">
        <TermBlock term={CURRENT_TERM} defaultOpen />

        {past.length > 0 && (
          <details className="past-sessions">
            <summary className="past-sessions-summary">Прошедшие семестры</summary>
            <div className="term-blocks past-sessions-body">
              {past.map((term, i) => (
                <TermBlock key={i} term={term} defaultOpen={false} />
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  )
}
