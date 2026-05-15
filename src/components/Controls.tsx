import type { SessionType } from '../types'
import { SESSION_COLORS } from '../constants'

interface ControlsProps {
  isRunning: boolean
  sessionType: SessionType
  onStart: () => void
  onPause: () => void
  onReset: () => void
  onSkip: () => void
}

export function Controls({
  isRunning, sessionType, onStart, onPause, onReset, onSkip,
}: ControlsProps) {
  const colors = SESSION_COLORS[sessionType]

  return (
    <div className="flex items-center justify-center gap-8 mt-4">
      {/* Reset */}
      <button
        onClick={onReset}
        className="zen-btn group w-11 h-11 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 flex items-center justify-center shadow-sm"
        title="重置"
      >
        <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>

      {/* Play/Pause */}
      <button
        onClick={isRunning ? onPause : onStart}
        className={`zen-btn relative w-16 h-16 rounded-full ${colors.bg} ${colors.bgHover} flex items-center justify-center ${colors.glow}`}
        title={isRunning ? '暂停' : '开始'}
      >
        {/* Inner ring */}
        <div className="absolute inset-1.5 rounded-full border border-white/20" />

        {/* Icon */}
        {isRunning ? (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}

        {/* Pulse animation */}
        {isRunning && (
          <div className={`absolute inset-0 rounded-full ${colors.bg} animate-ping opacity-15`} />
        )}
      </button>

      {/* Skip */}
      <button
        onClick={onSkip}
        className="zen-btn group w-11 h-11 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 flex items-center justify-center shadow-sm"
        title="跳过"
      >
        <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}
