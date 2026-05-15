interface ThemeToggleProps {
  theme: 'light' | 'dark'
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      title={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
    >
      {theme === 'dark' ? (
        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0-3a1 1 0 001-1V1a1 1 0 00-2 0v2a1 1 0 001 1zm0 18a1 1 0 00-1 1v2a1 1 0 002 0v-2a1 1 0 00-1-1zm9-9h-2a1 1 0 000 2h2a1 1 0 000-2zM4 11H2a1 1 0 000 2h2a1 1 0 000-2zm15.07-6.07l-1.41 1.41a1 1 0 001.41 1.41l1.41-1.41a1 1 0 00-1.41-1.41zM5.34 17.24l-1.41 1.41a1 1 0 001.41 1.41l1.41-1.41a1 1 0 00-1.41-1.41zM19.07 17.24a1 1 0 00-1.41 1.41l1.41 1.41a1 1 0 001.41-1.41l-1.41-1.41zM5.34 6.76a1 1 0 001.41-1.41L5.34 3.94a1 1 0 00-1.41 1.41l1.41 1.41z" />
        </svg>
      )}
    </button>
  )
}
