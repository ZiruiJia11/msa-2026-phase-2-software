import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Quests from './pages/Quests'
import About from './pages/About'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <aside className="sidebar">
          <div>
            <p className="eyebrow">FitQuest</p>
            <h1>Quest Board</h1>
          </div>
          <nav aria-label="Main navigation">
            <NavLink to="/" end>Quests</NavLink>
            <NavLink to="/about">About</NavLink>
          </nav>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Quests />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
