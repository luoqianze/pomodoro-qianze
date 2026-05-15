import type { SessionType } from '../types'
import { SESSION_COLORS, SESSION_LABELS } from '../constants'

interface SessionInfoProps {
  sessionType: SessionType
  completedPomodoros: number
  longBreakInterval: number
}

export function SessionInfo({
  sessionType, completedPomodoros, longBreakInterval,
}: SessionInfoProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className={`text-lg font-semibold ${SESSION_COLORS[sessionType].text}`}>
        {SESSION_LABELS[sessionType]}
      </span>
      <div className="flex gap-2">
        {Array.from({ length: longBreakInterval }).map((_, i) => (
          <div key={i}
            className={`w-3 h-3 rounded-full transition-colors ${
              i < completedPomodoros % longBreakInterval
                ? 'bg-amber-500'
                : 'bg-gray-300 dark:bg-gray-600'
            }`} />
        ))}
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        已完成 {completedPomodoros} 个番茄
      </span>
    </div>
  )
}
