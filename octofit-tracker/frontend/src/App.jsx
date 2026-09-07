import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { apiBaseUrl } from './api.js'
import './App.css'

const navigation = [
  ['/', 'Overview'],
  ['/activities', 'Activities'],
  ['/leaderboard', 'Leaderboard'],
  ['/teams', 'Teams'],
  ['/users', 'Athletes'],
  ['/workouts', 'Workouts'],
]

function App() {
  return (
    <div className="app-shell">
      <header className="navbar navbar-expand-lg border-bottom bg-white">
        <div className="container">
          <NavLink className="navbar-brand fw-bold text-primary" to="/">OctoFit Tracker</NavLink>
          <nav className="d-flex flex-wrap gap-2" aria-label="Primary navigation">
            {navigation.map(([to, label]) => (
              <NavLink
                className={({ isActive }) => `nav-link px-2 ${isActive ? 'active fw-semibold' : ''}`}
                end={to === '/'}
                key={to}
                to={to}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="container py-5">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>
      <footer className="border-top py-3 text-center text-secondary small">
        API: {apiBaseUrl}
      </footer>
    </div>
  )
}

function Overview() {
  return (
    <section className="hero-panel p-4 p-md-5 rounded-4">
      <p className="text-uppercase small fw-bold text-primary mb-2">Move together</p>
      <h1 className="display-4 fw-bold">Small steps. Strong teams. Big progress.</h1>
      <p className="lead text-secondary mb-4">Track activities, discover workouts, and climb the leaderboard with OctoFit.</p>
      <div className="d-flex flex-wrap gap-2">
        <NavLink className="btn btn-primary" to="/activities">View activities</NavLink>
        <NavLink className="btn btn-outline-primary" to="/workouts">Find a workout</NavLink>
      </div>
    </section>
  )
}

export default App
