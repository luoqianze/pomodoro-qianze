import { useState, useEffect, useRef, useCallback } from 'react'
import type { SessionType, Settings } from '../types'
import { SESSION_LABELS } from '../constants'

export function useTimer(settings: Settings, onSessionEnd: (type: SessionType) => void) {
  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [sessionType, setSessionType] = useState<SessionType>('work')
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const onSessionEndRef = useRef(onSessionEnd)
  onSessionEndRef.current = onSessionEnd

  const getDuration = useCallback(
    (type: SessionType) => {
      switch (type) {
        case 'work': return settings.workDuration * 60
        case 'shortBreak': return settings.shortBreakDuration * 60
        case 'longBreak': return settings.longBreakDuration * 60
      }
    },
    [settings]
  )

  const getNextSession = useCallback(
    (current: SessionType, completed: number): SessionType => {
      if (current === 'work') {
        const newCompleted = completed + 1
        if (newCompleted % settings.longBreakInterval === 0) return 'longBreak'
        return 'shortBreak'
      }
      return 'work'
    },
    [settings.longBreakInterval]
  )

  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          intervalRef.current = null
          setIsRunning(false)

          if (sessionType === 'work') {
            setCompletedPomodoros((c) => c + 1)
            onSessionEndRef.current('work')
          } else {
            onSessionEndRef.current(sessionType)
          }

          const next = getNextSession(sessionType, completedPomodoros)
          setSessionType(next)
          return getDuration(next)
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning, sessionType, completedPomodoros, getNextSession, getDuration])

  // Update title bar
  useEffect(() => {
    if (!window.electronAPI) return
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    window.electronAPI.updateTitle(`${timeStr} - ${SESSION_LABELS[sessionType]} - 番茄钟`)
  }, [timeLeft, sessionType])

  const start = useCallback(() => setIsRunning(true), [])
  const pause = useCallback(() => setIsRunning(false), [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setTimeLeft(getDuration(sessionType))
  }, [sessionType, getDuration])

  const skip = useCallback(() => {
    setIsRunning(false)
    const next = getNextSession(sessionType, completedPomodoros)
    setSessionType(next)
    setTimeLeft(getDuration(next))
  }, [sessionType, completedPomodoros, getNextSession, getDuration])

  return {
    timeLeft, isRunning, sessionType, completedPomodoros,
    start, pause, reset, skip, getDuration,
  }
}
