import type { SessionType } from '../types'
import { SESSION_COLORS } from '../constants'

interface TimerProps {
  timeLeft: number
  sessionType: SessionType
  totalTime: number
}

export function Timer({ timeLeft, sessionType, totalTime }: TimerProps) {
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progress = totalTime > 0 ? (totalTime - timeLeft) / totalTime : 0

  const radius = 120
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - progress)

  const color = SESSION_COLORS[sessionType].hex

  return (
    <div className="relative flex items-center justify-center">
      <svg width="280" height="280" className="-rotate-90">
        <circle
          cx="140" cy="140" r={radius}
          fill="none" stroke="currentColor"
          className="text-gray-200 dark:text-gray-700" strokeWidth="8"
        />
        <circle
          cx="140" cy="140" r={radius}
          fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-6xl font-mono font-bold tracking-wider" style={{ color }}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}
