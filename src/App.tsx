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
import { SESSION_COLORS } from './constants'

let audioCtx: AudioContext | null = null

function playNotificationSound() {
  try {
    if (!audioCtx || audioCtx.state === 'closed') {
      audioCtx = new AudioContext()
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume()
    }
    const ctx = audioCtx
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

  useEffect(() => {
    if (!settingsLoaded || settings.theme === theme) return
    const newSettings = { ...settings, theme }
    setSettingsState(newSettings)
    window.electronAPI?.setSettings(newSettings)
  }, [theme])

  if (!settingsLoaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
          <span className="text-sm text-gray-400 font-medium tracking-wider">加载中...</span>
        </div>
      </div>
    )
  }

  const colors = SESSION_COLORS[timer.sessionType]

  // Dynamic background
  const bgGradient = theme === 'dark'
    ? `linear-gradient(165deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)`
    : timer.sessionType === 'work'
      ? 'linear-gradient(165deg, #fffbeb 0%, #fef3c7 30%, #fff7ed 70%, #fefce8 100%)'
      : timer.sessionType === 'shortBreak'
        ? 'linear-gradient(165deg, #ecfdf5 0%, #d1fae5 30%, #f0fdf4 70%, #ecfdf5 100%)'
        : 'linear-gradient(165deg, #eff6ff 0%, #dbeafe 30%, #f0f9ff 70%, #eff6ff 100%)'

  return (
    <div
      className="h-screen flex flex-col overflow-hidden transition-all duration-1000 relative"
      style={{ background: bgGradient }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full blur-[80px] opacity-40 transition-all duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colors.hex}30 0%, transparent 70%)`,
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full transition-colors duration-700" style={{ backgroundColor: colors.hex }} />
          <span className="text-sm font-display text-gray-500 dark:text-gray-400 tracking-wider">番茄钟</span>
        </div>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col min-h-0">
        {page === 'timer' && (
          <div className="flex-1 flex flex-col items-center pt-1 gap-4 px-4 pb-4">
            <SessionInfo
              sessionType={timer.sessionType}
              completedPomodoros={timer.completedPomodoros}
              longBreakInterval={settings.longBreakInterval}
            />
            <Timer
              timeLeft={timer.timeLeft}
              sessionType={timer.sessionType}
              totalTime={timer.getDuration(timer.sessionType)}
            />
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
          <div className="flex-1">
            <Statistics stats={stats} todayStats={todayStats} weekStats={weekStats} />
          </div>
        )}
        {page === 'settings' && (
          <div className="flex-1">
            <Settings settings={settings} onUpdate={handleSettingsUpdate} />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="relative z-10">
        <Navigation current={page} onNavigate={setPage} />
      </div>
    </div>
  )
}
