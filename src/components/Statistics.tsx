import type { Statistics as StatsType, DailyStats } from '../types'

interface StatisticsProps {
  stats: StatsType
  todayStats: DailyStats
  weekStats: { date: string; count: number }[]
}

export function Statistics({ stats, todayStats, weekStats }: StatisticsProps) {
  const maxCount = Math.max(...weekStats.map((d) => d.count), 1)

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">统计</h2>

      {/* Today */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-amber-500">{todayStats.count}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">今日番茄</div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-blue-500">
            {todayStats.totalMinutes}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">今日专注(分钟)</div>
        </div>
      </div>

      {/* Weekly chart */}
      <div>
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
          最近 7 天
        </h3>
        <div className="flex items-end justify-between gap-2 h-32">
          {weekStats.map((day) => (
            <div key={day.date} className="flex flex-col items-center flex-1 gap-1">
              <span className="text-xs text-gray-500">{day.count || ''}</span>
              <div
                className="w-full bg-amber-400 dark:bg-amber-500 rounded-t transition-all"
                style={{
                  height: `${day.count > 0 ? Math.max((day.count / maxCount) * 100, 8) : 4}%`,
                }}
              />
              <span className="text-xs text-gray-400">{day.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="border-t dark:border-gray-700 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">累计番茄</span>
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            {stats.totalPomodoros} 个
          </span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-gray-500 dark:text-gray-400">累计专注</span>
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            {Math.floor(stats.totalMinutes / 60)} 小时 {stats.totalMinutes % 60} 分钟
          </span>
        </div>
      </div>
    </div>
  )
}
