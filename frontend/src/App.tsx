import { useEffect, useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Achievements from './pages/Achievements'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Progress from './pages/Progress'
import Quests from './pages/Quests'
import Settings from './pages/Settings'
import './App.css'

export type ThemeMode = 'light' | 'dark'

const themeStorageKey = 'fitquest-theme'

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light'

  return window.localStorage.getItem(themeStorageKey) === 'dark' ? 'dark' : 'light'
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem(themeStorageKey, theme)
  }, [theme])

  return (
    <BrowserRouter>
      <div className="app-shell">
        <aside className="sidebar">
          <div className="brand-block">
            <span className="brand-mark" aria-hidden="true">FQ</span>
            <p className="eyebrow">FitQuest</p>
            <h1>Player Hub</h1>
            <p className="sidebar-copy">Track quests, earn XP, and build training streaks.</p>
          </div>
          <nav aria-label="Main navigation">
            <NavLink to="/" end>Dashboard</NavLink>
            <NavLink to="/quests">Quests</NavLink>
            <NavLink to="/progress">Progress</NavLink>
            <NavLink to="/achievements">Achievements</NavLink>
            <NavLink to="/settings">Settings</NavLink>
          </nav>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/quests" element={<Quests />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/settings" element={<Settings theme={theme} onThemeChange={setTheme} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
