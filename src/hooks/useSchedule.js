import { useState, useEffect } from 'react'

const SCHEDULE_URL = `${import.meta.env.BASE_URL}schedule.json`

// data: { weeks: [...], sessions: [...] } | null (пока не загружено)
export function useSchedule() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch(SCHEDULE_URL, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json) => {
        if (!cancelled) setData(json)
      })
      .catch((err) => {
        if (!cancelled) setError(err)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { data, error }
}
