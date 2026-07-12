import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Achievements from './pages/Achievements'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Progress from './pages/Progress'
import Quests from './pages/Quests'
import Settings from './pages/Settings'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <aside className="sidebar">
          <div>
            <p className="eyebrow">FitQuest</p>
            <h1>Player Hub</h1>
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
