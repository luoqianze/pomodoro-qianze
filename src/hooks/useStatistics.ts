import { useState, useEffect, useCallback, useMemo } from 'react'
import type { Statistics } from '../types'
import { DEFAULT_STATISTICS } from '../types'

export function useStatistics() {
  const [stats, setStats] = useState<Statistics>(DEFAULT_STATISTICS)

  const loadStats = useCallback(async () => {
    if (window.electronAPI) {
      const data = await window.electronAPI.getStats()
      setStats(data)
    }
  }, [])

  useEffect(() => { loadStats() }, [loadStats])

  const addPomodoro = useCallback(
    async (minutes: number) => {
      if (window.electronAPI) {
        await window.electronAPI.addPomodoro(minutes)
        await loadStats()
      }
    },
    [loadStats]
  )

  const today = new Date().toISOString().split('T')[0]
  const todayStats = useMemo(
    () => stats.daily[today] || { count: 0, totalMinutes: 0 },
    [stats, today]
  )

  const weekStats = useMemo(() => {
    const result: { date: string; count: number }[] = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const key = d.toISOString().split('T')[0]
      result.push({
        date: key.slice(5),
        count: stats.daily[key]?.count || 0,
      })
    }
    return result
  }, [stats])

  return { stats, todayStats, weekStats, addPomodoro, refresh: loadStats }
}
