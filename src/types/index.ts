export type SessionType = 'work' | 'shortBreak' | 'longBreak'

export interface Settings {
  workDuration: number      // minutes
  shortBreakDuration: number
  longBreakDuration: number
  longBreakInterval: number // pomodoros before long break
  theme: 'light' | 'dark'
}

export interface DailyStats {
  count: number
  totalMinutes: number
}

export interface Statistics {
  daily: Record<string, DailyStats> // key: YYYY-MM-DD
  totalPomodoros: number
  totalMinutes: number
}

export const DEFAULT_SETTINGS: Settings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
  theme: 'dark',
}

export const DEFAULT_STATISTICS: Statistics = {
  daily: {},
  totalPomodoros: 0,
  totalMinutes: 0,
}

declare global {
  interface Window {
    electronAPI: {
      getSettings: () => Promise<Settings>
      setSettings: (settings: Settings) => Promise<void>
      getStats: () => Promise<Statistics>
      addPomodoro: (minutes: number) => Promise<void>
      updateTitle: (text: string) => void
      showNotification: (title: string, body: string) => void
    }
  }
}
