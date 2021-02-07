import React from 'react'
import { THEME, useTheme } from '../../hooks/theme'

export const ThemeSelect = ({ classes }: { classes?: string }): JSX.Element => {
  const { setTheme, theme } = useTheme()
  return (
    <div className={`flex justify-end ${classes}`}>
      <select
        className="px-2 py-1 rounded shadow-md font-sans text-gray-800"
        value={theme}
        onChange={(e) => setTheme(e.target.value as THEME)}
        onBlur={(e) => setTheme(e.target.value as THEME)}
        name="theme"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>
  )
}
