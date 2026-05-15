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

  const radius = 100
  const strokeWidth = 6
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - progress)

  const colors = SESSION_COLORS[sessionType]
  const isActive = timeLeft > 0 && timeLeft < totalTime

  return (
    <div className="relative flex items-center justify-center">
      {/* Ambient glow */}
      <div
        className="absolute w-[220px] h-[220px] rounded-full glow-pulse transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${colors.hex}25 0%, transparent 70%)`,
        }}
      />

      {/* SVG Timer */}
      <svg
        width="220"
        height="220"
        className={`-rotate-90 ${isActive ? 'zen-pulse' : ''}`}
        style={{ filter: `drop-shadow(0 0 20px ${colors.hex}15)` }}
      >
        {/* Track */}
        <circle
          cx="110" cy="110" r={radius}
          fill="none"
          stroke="currentColor"
          className="text-gray-100 dark:text-gray-800"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id={`timer-gradient-${sessionType}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.hexSoft} />
            <stop offset="100%" stopColor={colors.hex} />
          </linearGradient>
        </defs>

        {/* Progress */}
        <circle
          cx="110" cy="110" r={radius}
          fill="none"
          stroke={`url(#timer-gradient-${sessionType})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />

        {/* Progress dot at the end of progress */}
        {progress > 0.02 && (
          <circle
            cx={110 + radius * Math.cos(2 * Math.PI * progress)}
            cy={110 + radius * Math.sin(2 * Math.PI * progress)}
            r="5"
            fill="white"
            stroke={colors.hex}
            strokeWidth="2"
            style={{ filter: `drop-shadow(0 0 4px ${colors.hex})` }}
          />
        )}

      </svg>

      {/* Center content */}
      <div className="absolute flex flex-col items-center">
        {/* Time display */}
        <div className="flex items-baseline">
          <span className={`font-time text-[56px] leading-none ${colors.gradient}`}>
            {String(minutes).padStart(2, '0')}
          </span>
          <span className={`font-time text-[56px] leading-none breathe mx-0.5 ${colors.text}`}>:</span>
          <span className={`font-time text-[56px] leading-none ${colors.gradient}`}>
            {String(seconds).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  )
}
