import type { SessionType } from './types'

export type Page = 'timer' | 'stats' | 'settings'

export const SESSION_COLORS: Record<SessionType, {
  hex: string
  hexSoft: string
  bg: string
  bgHover: string
  text: string
  gradient: string
  glow: string
}> = {
  work: {
    hex: '#d97706',
    hexSoft: '#fbbf24',
    bg: 'bg-amber-500',
    bgHover: 'hover:bg-amber-400',
    text: 'text-amber-500',
    gradient: 'gradient-text-work',
    glow: 'glow-work',
  },
  shortBreak: {
    hex: '#059669',
    hexSoft: '#34d399',
    bg: 'bg-emerald-500',
    bgHover: 'hover:bg-emerald-400',
    text: 'text-emerald-500',
    gradient: 'gradient-text-short-break',
    glow: 'glow-short-break',
  },
  longBreak: {
    hex: '#2563eb',
    hexSoft: '#60a5fa',
    bg: 'bg-blue-500',
    bgHover: 'hover:bg-blue-400',
    text: 'text-blue-500',
    gradient: 'gradient-text-long-break',
    glow: 'glow-long-break',
  },
}

export const SESSION_LABELS: Record<SessionType, string> = {
  work: '工作中',
  shortBreak: '轻松一下',
  longBreak: '长休息',
}
