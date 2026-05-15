import type { Statistics as StatsType, DailyStats } from '../types'

interface StatisticsProps {
  stats: StatsType
  todayStats: DailyStats
  weekStats: { date: string; count: number }[]
}

export function Statistics({ stats, todayStats, weekStats }: StatisticsProps) {
  const maxCount = Math.max(...weekStats.map((d) => d.count), 1)
  const weekTotal = weekStats.reduce((sum, d) => sum + d.count, 0)

  return (
    <div className="p-4 space-y-4 fade-in-up">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-1 h-6 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600" />
        <h2 className="text-lg font-display text-gray-800 dark:text-gray-100 tracking-wider">统计</h2>
      </div>

      {/* Today stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card noise p-3 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-100 dark:border-amber-800/30">
          <div className="text-2xl font-time text-amber-600 dark:text-amber-400">{todayStats.count}</div>
          <div className="text-[10px] text-amber-500/70 dark:text-amber-400/50 mt-0.5 font-medium">今日番茄</div>
        </div>
        <div className="card noise p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800/30">
          <div className="text-2xl font-time text-blue-600 dark:text-blue-400">{todayStats.totalMinutes}</div>
          <div className="text-[10px] text-blue-500/70 dark:text-blue-400/50 mt-0.5 font-medium">专注分钟</div>
        </div>
      </div>

      {/* Weekly chart */}
      <div className="card noise p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">最近 7 天</h3>
          <span className="text-[10px] text-gray-400 font-medium">{weekTotal} 个番茄</span>
        </div>
        <div className="flex items-end justify-between gap-2 h-24">
          {weekStats.map((day, index) => {
            const height = day.count > 0 ? Math.max((day.count / maxCount) * 100, 12) : 6
            const isToday = index === weekStats.length - 1

            return (
              <div key={day.date} className="flex flex-col items-center flex-1 gap-1">
                <span className={`text-[9px] font-medium ${isToday ? 'text-amber-500' : 'text-gray-300 dark:text-gray-600'}`}>
                  {day.count || ''}
                </span>
                <div className="w-full flex-1 flex items-end">
                  <div
                    className={`w-full rounded-t transition-all duration-700 ease-out ${
                      isToday
                        ? 'bg-gradient-to-t from-amber-400 to-amber-300'
                        : day.count > 0
                          ? 'bg-gradient-to-t from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600'
                          : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className={`text-[9px] ${isToday ? 'text-amber-500 font-semibold' : 'text-gray-300 dark:text-gray-600'}`}>
                  {day.date}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Total stats */}
      <div className="card noise p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <h3 className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">累计数据</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">累计番茄</span>
            <span className="font-time text-sm text-gray-800 dark:text-gray-200">{stats.totalPomodoros}</span>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-100 dark:via-gray-700 to-transparent" />
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">累计专注</span>
            <span className="font-time text-sm text-gray-800 dark:text-gray-200">
              {Math.floor(stats.totalMinutes / 60)}h {stats.totalMinutes % 60}m
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
