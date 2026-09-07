import { useEffect } from 'react'
import { toYMD, findWeekForDate, findDayInWeek, parseIso } from '../utils/time'

const MINUTES_BEFORE = 15
const CHECK_INTERVAL_MS = 30_000
const NOTIFIED_KEY = 'notifiedLessons'

function loadNotifiedIds() {
  try {
    const raw = localStorage.getItem(NOTIFIED_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

function saveNotifiedIds(set) {
  try {
    // ограничиваем размер, чтобы не копить бесконечно
    const arr = Array.from(set).slice(-200)
    localStorage.setItem(NOTIFIED_KEY, JSON.stringify(arr))
  } catch {
    // localStorage недоступен — просто не сохраняем
  }
}

// Локальные уведомления за MINUTES_BEFORE минут до начала пары.
// Работают только пока приложение открыто (хотя бы в фоновой вкладке) —
// без бэкенд-сервера настоящий push, когда PWA полностью закрыто,
// на iOS Safari недоступен.
export function useLessonNotifications(weeks, enabled) {
  useEffect(() => {
    if (!enabled || !weeks || typeof Notification === 'undefined') return
    if (Notification.permission !== 'granted') return

    const notified = loadNotifiedIds()

    function check() {
      const now = new Date()
      const ymd = toYMD(now)
      const week = findWeekForDate(weeks, ymd)
      const day = findDayInWeek(week, ymd)
      if (!day) return

      for (const lesson of day.lessons) {
        const id = `${ymd}_${lesson.pair_number}_${lesson.subject}`
        if (notified.has(id)) continue

        const start = parseIso(lesson.time_begin)
        const diffMin = (start - now) / 60000

        if (diffMin > 0 && diffMin <= MINUTES_BEFORE) {
          new Notification(`Через ${Math.round(diffMin)} мин: ${lesson.subject}`, {
            body: [lesson.lesson_type, lesson.room && `ауд. ${lesson.room}`]
              .filter(Boolean)
              .join(' · '),
            tag: id,
          })
          notified.add(id)
          saveNotifiedIds(notified)
        }
      }
    }

    check()
    const id = setInterval(check, CHECK_INTERVAL_MS)
    return () => clearInterval(id)
  }, [weeks, enabled])
}
