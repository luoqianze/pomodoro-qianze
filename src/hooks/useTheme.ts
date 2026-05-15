import { useState, useEffect, useCallback } from 'react'

export function useTheme(initialTheme: 'light' | 'dark') {
  const [theme, setThemeState] = useState<'light' | 'dark'>(initialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const setTheme = useCallback((t: 'light' | 'dark') => {
    setThemeState(t)
  }, [])

  return { theme, toggleTheme, setTheme }
}
