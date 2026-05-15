import { useState, useEffect, useCallback } from 'react'
import { Timer } from './components/Timer'
import { Controls } from './components/Controls'
import { SessionInfo } from './components/SessionInfo'
import { Settings } from './components/Settings'
import { Statistics } from './components/Statistics'
import { ThemeToggle } from './components/ThemeToggle'
import { Navigation } from './components/Navigation'
import { useTimer } from './hooks/useTimer'
import { useTheme } from './hooks/useTheme'
import { useStatistics } from './hooks/useStatistics'
import { DEFAULT_SETTINGS, type SessionType, type Settings as SettingsType } from './types'
import type { Page } from './constants'

function playNotificationSound() {
  try {
    const ctx = new AudioContext()
    const notes = [523.25, 659.25, 783.99]
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.15)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 0.4)
      osc.start(ctx.currentTime + i * 0.15)
      osc.stop(ctx.currentTime + i * 0.15 + 0.4)
    })
  } catch { /* AudioContext not available */ }
}

export default function App() {
  const [page, setPage] = useState<Page>('timer')
  const [settings, setSettingsState] = useState<SettingsType>(DEFAULT_SETTINGS)
  const [settingsLoaded, setSettingsLoaded] = useState(false)

  const { theme, toggleTheme, setTheme } = useTheme(settings.theme)
  const { stats, todayStats, weekStats, addPomodoro } = useStatistics()

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getSettings().then((s) => {
        setSettingsState(s)
        setTheme(s.theme)
        setSettingsLoaded(true)
      })
    } else {
      setSettingsLoaded(true)
    }
  }, [setTheme])

  const handleSessionEnd = useCallback(
    (type: SessionType) => {
      playNotificationSound()
      if (type === 'work') {
        addPomodoro(settings.workDuration)
        window.electronAPI?.showNotification('番茄钟', '太棒了！完成了一个番茄，休息一下吧 🍅')
      } else {
        window.electronAPI?.showNotification('番茄钟', '休息结束，继续加油！')
      }
    },
    [addPomodoro, settings.workDuration]
  )

  const timer = useTimer(settings, handleSessionEnd)

  const handleSettingsUpdate = useCallback(
    (newSettings: SettingsType) => {
      setSettingsState(newSettings)
      window.electronAPI?.setSettings(newSettings)
      if (newSettings.theme !== theme) {
        setTheme(newSettings.theme)
      }
    },
    [theme, setTheme]
  )

  // Persist theme toggle back to settings
  useEffect(() => {
    if (!settingsLoaded || settings.theme === theme) return
    const newSettings = { ...settings, theme }
    setSettingsState(newSettings)
    window.electronAPI?.setSettings(newSettings)
  }, [theme]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!settingsLoaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <span className="text-gray-400">加载中...</span>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="w-8" />
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">番茄钟</span>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {page === 'timer' && (
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <SessionInfo
              sessionType={timer.sessionType}
              completedPomodoros={timer.completedPomodoros}
              longBreakInterval={settings.longBreakInterval}
            />
            <div className="mt-8">
              <Timer
                timeLeft={timer.timeLeft}
                sessionType={timer.sessionType}
                totalTime={timer.getDuration(timer.sessionType)}
              />
            </div>
            <Controls
              isRunning={timer.isRunning}
              sessionType={timer.sessionType}
              onStart={timer.start}
              onPause={timer.pause}
              onReset={timer.reset}
              onSkip={timer.skip}
            />
          </div>
        )}
        {page === 'stats' && (
          <div className="flex-1 overflow-y-auto">
            <Statistics stats={stats} todayStats={todayStats} weekStats={weekStats} />
          </div>
        )}
        {page === 'settings' && (
          <div className="flex-1 overflow-y-auto">
            <Settings settings={settings} onUpdate={handleSettingsUpdate} />
          </div>
        )}
      </div>

      <Navigation current={page} onNavigate={setPage} />
    </div>
  )
}
