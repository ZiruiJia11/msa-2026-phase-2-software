import { create } from 'zustand'

export type ThemeMode = 'light' | 'dark'

const themeStorageKey = 'fitquest-theme'

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light'

  return window.localStorage.getItem(themeStorageKey) === 'dark' ? 'dark' : 'light'
}

interface ThemeState {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
  applyTheme: () => void
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: getInitialTheme(),
  setTheme: theme => {
    window.localStorage.setItem(themeStorageKey, theme)
    document.documentElement.dataset.theme = theme
    set({ theme })
  },
  applyTheme: () => {
    const { theme } = get()
    window.localStorage.setItem(themeStorageKey, theme)
    document.documentElement.dataset.theme = theme
  },
}))
