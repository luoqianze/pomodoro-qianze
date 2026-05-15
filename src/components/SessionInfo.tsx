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
  const colors = SESSION_COLORS[sessionType]

  return (
    <div className="flex flex-col items-center gap-4 fade-in-up">
      {/* Session badge */}
      <div className={`px-5 py-2 rounded-full glass ${colors.text}`}>
        <span className="text-lg font-display tracking-wider">
          {SESSION_LABELS[sessionType]}
        </span>
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-2.5">
        {Array.from({ length: longBreakInterval }).map((_, i) => {
          const isCompleted = i < completedPomodoros % longBreakInterval

          return (
            <div
              key={i}
              className="relative"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  isCompleted
                    ? `${colors.bg} shadow-lg`
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
                style={{
                  boxShadow: isCompleted ? `0 0 12px ${colors.hex}40` : 'none',
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Count */}
      <div className="flex items-center gap-3">
        <div className="w-6 h-px bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600" />
        <span className="text-xs text-gray-400 dark:text-gray-500 font-medium tracking-wider">
          已完成 {completedPomodoros} 个番茄
        </span>
        <div className="w-6 h-px bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600" />
      </div>
    </div>
  )
}
