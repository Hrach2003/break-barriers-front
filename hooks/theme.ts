import { useEffect, useState } from 'react'

export type THEME = 'dark' | 'light' | 'system'

interface ITheme {
  setTheme: React.Dispatch<React.SetStateAction<THEME>>
  theme: THEME
}

export function useTheme(): ITheme {
  const [theme, setTheme] = useState<THEME>('system')

  useEffect(() => {
    localStorage.theme = theme
    console.log(theme)
    if (
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    )
      document.documentElement.classList.add('dark')
    if (
      theme === 'light' ||
      (theme === 'system' &&
        !window.matchMedia('(prefers-color-scheme: dark)').matches)
    )
      document.documentElement.classList.remove('dark')
  }, [theme])
  return { setTheme, theme }
}
