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
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">设置</h2>

      <div className="space-y-4">
        {/* Work duration */}
        <div className="flex items-center justify-between">
          <label className="text-gray-700 dark:text-gray-300">工作时长</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max="60"
              value={settings.workDuration}
              onChange={(e) => handleChange('workDuration', Number(e.target.value))}
              className="w-16 px-2 py-1 text-center rounded border
                         bg-white dark:bg-gray-700 dark:border-gray-600
                         focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <span className="text-sm text-gray-500">分钟</span>
          </div>
        </div>

        {/* Short break duration */}
        <div className="flex items-center justify-between">
          <label className="text-gray-700 dark:text-gray-300">短休息时长</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max="30"
              value={settings.shortBreakDuration}
              onChange={(e) => handleChange('shortBreakDuration', Number(e.target.value))}
              className="w-16 px-2 py-1 text-center rounded border
                         bg-white dark:bg-gray-700 dark:border-gray-600
                         focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <span className="text-sm text-gray-500">分钟</span>
          </div>
        </div>

        {/* Long break duration */}
        <div className="flex items-center justify-between">
          <label className="text-gray-700 dark:text-gray-300">长休息时长</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max="60"
              value={settings.longBreakDuration}
              onChange={(e) => handleChange('longBreakDuration', Number(e.target.value))}
              className="w-16 px-2 py-1 text-center rounded border
                         bg-white dark:bg-gray-700 dark:border-gray-600
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="text-sm text-gray-500">分钟</span>
          </div>
        </div>

        {/* Long break interval */}
        <div className="flex items-center justify-between">
          <label className="text-gray-700 dark:text-gray-300">长休息间隔</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="2"
              max="10"
              value={settings.longBreakInterval}
              onChange={(e) => handleChange('longBreakInterval', Number(e.target.value))}
              className="w-16 px-2 py-1 text-center rounded border
                         bg-white dark:bg-gray-700 dark:border-gray-600
                         focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <span className="text-sm text-gray-500">个番茄</span>
          </div>
        </div>
      </div>
    </div>
  )
}
