import { useEffect } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Achievements from './pages/Achievements'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Progress from './pages/Progress'
import Quests from './pages/Quests'
import Settings from './pages/Settings'
import { useThemeStore } from './stores/useThemeStore'
import './App.css'

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
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
