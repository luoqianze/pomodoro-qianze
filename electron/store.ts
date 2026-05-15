import { app } from 'electron'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import type { Settings, Statistics } from '../src/types'
import { DEFAULT_SETTINGS, DEFAULT_STATISTICS } from '../src/types'

function getStorePath(filename: string): string {
  const dir = join(app.getPath('userData'), 'pomodoro-data')
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  return join(dir, filename)
}

function readJSON<T>(filename: string, defaultValue: T): T {
  const path = getStorePath(filename)
  if (!existsSync(path)) {
    return defaultValue
  }
  try {
    return JSON.parse(readFileSync(path, 'utf-8'))
  } catch {
    return defaultValue
  }
}

function writeJSON(filename: string, data: unknown): void {
  writeFileSync(getStorePath(filename), JSON.stringify(data, null, 2))
}

export function getSettings(): Settings {
  return readJSON<Settings>('settings.json', DEFAULT_SETTINGS)
}

export function setSettings(settings: Settings): void {
  writeJSON('settings.json', settings)
}

export function getStats(): Statistics {
  return readJSON<Statistics>('stats.json', DEFAULT_STATISTICS)
}

export function addPomodoro(minutes: number): void {
  const stats = getStats()
  const today = new Date().toISOString().split('T')[0]

  if (!stats.daily[today]) {
    stats.daily[today] = { count: 0, totalMinutes: 0 }
  }
  stats.daily[today].count += 1
  stats.daily[today].totalMinutes += minutes
  stats.totalPomodoros += 1
  stats.totalMinutes += minutes

  writeJSON('stats.json', stats)
}
