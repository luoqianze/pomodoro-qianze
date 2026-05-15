import type { SessionType } from './types'

export type Page = 'timer' | 'stats' | 'settings'

export const SESSION_COLORS: Record<SessionType, { hex: string; bg: string; text: string }> = {
  work:       { hex: '#f59e0b', bg: 'bg-amber-500 hover:bg-amber-600', text: 'text-amber-500' },
  shortBreak: { hex: '#22c55e', bg: 'bg-green-500 hover:bg-green-600', text: 'text-green-500' },
  longBreak:  { hex: '#3b82f6', bg: 'bg-blue-500 hover:bg-blue-600',   text: 'text-blue-500' },
}

export const SESSION_LABELS: Record<SessionType, string> = {
  work: '工作中',
  shortBreak: '短休息',
  longBreak: '长休息',
}
