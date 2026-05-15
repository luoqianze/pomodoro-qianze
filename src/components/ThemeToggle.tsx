interface ThemeToggleProps {
  theme: 'light' | 'dark'
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="zen-btn w-9 h-9 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 flex items-center justify-center shadow-sm"
      title={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
    >
      <div className="relative w-4 h-4">
        {/* Sun */}
        <svg
          className={`absolute inset-0 w-4 h-4 transition-all duration-500 ${
            theme === 'dark'
              ? 'text-gray-400 rotate-90 scale-0 opacity-0'
              : 'text-amber-500 rotate-0 scale-100 opacity-100'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>

        {/* Moon */}
        <svg
          className={`absolute inset-0 w-4 h-4 transition-all duration-500 ${
            theme === 'dark'
              ? 'text-blue-400 rotate-0 scale-100 opacity-100'
              : 'text-gray-400 -rotate-90 scale-0 opacity-0'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </div>
    </button>
  )
}
