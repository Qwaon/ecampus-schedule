// Формат дат в schedule.json: 'YYYY-MM-DDTHH:MM:SS' (ISO, без таймзоны,
// уже локальное время СКФУ) — парсим вручную, чтобы не зависеть от того,
// как new Date() трактует строки без 'Z'.

export function parseIso(iso) {
  const [datePart, timePart] = iso.split('T')
  const [y, m, d] = datePart.split('-').map(Number)
  const [h, min, s] = (timePart || '00:00:00').split(':').map(Number)
  return new Date(y, m - 1, d, h, min, s || 0)
}

export function toYMD(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function timeHM(iso) {
  const d = parseIso(iso)
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export function minutesOfDay(iso) {
  const d = parseIso(iso)
  return d.getHours() * 60 + d.getMinutes()
}

// Находит неделю в schedule.weeks, которая содержит указанную дату (YMD).
export function findWeekForDate(weeks, ymd) {
  return weeks.find((w) => {
    const begin = w.date_begin.slice(0, 10)
    const end = w.date_end.slice(0, 10)
    return ymd >= begin && ymd < end
  })
}

export function findDayInWeek(week, ymd) {
  if (!week) return null
  return week.days.find((d) => d.date.slice(0, 10) === ymd) || null
}

export function getCurrentIndex(lessons) {
  const cur = new Date().getHours() * 60 + new Date().getMinutes()
  return lessons.findIndex((l) => {
    const s = minutesOfDay(l.time_begin)
    const e = minutesOfDay(l.time_end)
    return cur >= s && cur <= e
  })
}

export function getNextIndex(lessons) {
  const cur = new Date().getHours() * 60 + new Date().getMinutes()
  return lessons.findIndex((l) => minutesOfDay(l.time_begin) > cur)
}

const WEEKDAY_ORDER = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']

export function weekdaySortIndex(weekday) {
  const i = WEEKDAY_ORDER.indexOf(weekday)
  return i === -1 ? 99 : i
}
