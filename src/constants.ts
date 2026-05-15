import type { SessionType } from './types'

export type Page = 'timer' | 'stats' | 'settings'

export const SESSION_COLORS: Record<SessionType, { hex: string; bg: string; text: string }> = {
  work:       { hex: '#6366f1', bg: 'bg-indigo-500 hover:bg-indigo-600', text: 'text-indigo-500' },
  shortBreak: { hex: '#06b6d4', bg: 'bg-cyan-500 hover:bg-cyan-600',    text: 'text-cyan-500' },
  longBreak:  { hex: '#8b5cf6', bg: 'bg-violet-500 hover:bg-violet-600', text: 'text-violet-500' },
}

export const SESSION_LABELS: Record<SessionType, string> = {
  work: '工作中',
  shortBreak: '短休息',
  longBreak: '长休息',
}
