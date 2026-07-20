import { useEffect } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import PixelAvatar from './components/PixelAvatar'
import Achievements from './pages/Achievements'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Progress from './pages/Progress'
import Quests from './pages/Quests'
import Settings from './pages/Settings'
import { useThemeStore } from './stores/useThemeStore'
import './App.css'

const navItems = [
  { to: '/', label: 'Dashboard', mobileLabel: 'Home', end: true },
  { to: '/quests', label: 'Quests', mobileLabel: 'Quests' },
  { to: '/progress', label: 'Progress', mobileLabel: 'Logs' },
  { to: '/achievements', label: 'Achievements', mobileLabel: 'Badges' },
  { to: '/settings', label: 'Settings', mobileLabel: 'Set' },
]

export default function App() {
  const applyTheme = useThemeStore(state => state.applyTheme)

  useEffect(() => {
    applyTheme()
  }, [applyTheme])

  return (
    <BrowserRouter>
      <div className="app-shell">
        <aside className="sidebar">
          <div className="brand-block">
            <div className="brand-avatar">
              <span className="brand-mark" aria-hidden="true">FQ</span>
              <PixelAvatar decorative />
            </div>
            <p className="eyebrow">FitQuest</p>
            <h1>Player Hub</h1>
            <p className="sidebar-copy">Track quests, earn XP, and build training streaks.</p>
          </div>
          <nav aria-label="Main navigation">
            {navItems.map(item => (
              <NavLink key={item.to} to={item.to} end={item.end}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/quests" element={<Quests />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <nav className="mobile-tabbar" aria-label="Mobile navigation">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end}>
              {item.mobileLabel}
            </NavLink>
          ))}
        </nav>
      </div>
    </BrowserRouter>
  )
}
