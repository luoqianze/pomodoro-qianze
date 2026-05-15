import type { Settings as SettingsType } from '../types'

interface SettingsProps {
  settings: SettingsType
  onUpdate: (settings: SettingsType) => void
}

export function Settings({ settings, onUpdate }: SettingsProps) {
  const handleChange = (key: keyof SettingsType, value: number | string) => {
    onUpdate({ ...settings, [key]: value })
  }

  return (
    <div className="p-5 space-y-5 fade-in-up">
      {/* Duration settings */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">时长设置</h3>

        <div className="space-y-3">
          {/* Work */}
          <div className="card noise p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">工作时长</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={settings.workDuration}
                  onChange={(e) => handleChange('workDuration', Number(e.target.value))}
                  className="w-14 px-2 py-1.5 text-center rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm font-medium"
                />
                <span className="text-xs text-gray-400">分钟</span>
              </div>
            </div>
          </div>

          {/* Short break */}
          <div className="card noise p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">短休息时长</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={settings.shortBreakDuration}
                  onChange={(e) => handleChange('shortBreakDuration', Number(e.target.value))}
                  className="w-14 px-2 py-1.5 text-center rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm font-medium"
                />
                <span className="text-xs text-gray-400">分钟</span>
              </div>
            </div>
          </div>

          {/* Long break */}
          <div className="card noise p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">长休息时长</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={settings.longBreakDuration}
                  onChange={(e) => handleChange('longBreakDuration', Number(e.target.value))}
                  className="w-14 px-2 py-1.5 text-center rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm font-medium"
                />
                <span className="text-xs text-gray-400">分钟</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
        <span className="text-[10px] text-gray-300 dark:text-gray-600 tracking-widest">规则</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
      </div>

      {/* Break rules */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">休息规则</h3>

        <div className="card noise p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">长休息间隔</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="2"
                max="10"
                value={settings.longBreakInterval}
                onChange={(e) => handleChange('longBreakInterval', Number(e.target.value))}
                className="w-14 px-2 py-1.5 text-center rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm font-medium"
              />
              <span className="text-xs text-gray-400">个番茄</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
