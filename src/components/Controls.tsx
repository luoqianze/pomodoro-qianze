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
  const mainBtnColor = SESSION_COLORS[sessionType].bg

  return (
    <div className="flex items-center justify-center gap-6 mt-8">
      <button onClick={onReset}
        className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
        title="重置">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
      <button onClick={isRunning ? onPause : onStart}
        className={`w-16 h-16 rounded-full ${mainBtnColor} text-white flex items-center justify-center transition-colors shadow-lg`}
        title={isRunning ? '暂停' : '开始'}>
        {isRunning ? (
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
      <button onClick={onSkip}
        className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
        title="跳过">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}
