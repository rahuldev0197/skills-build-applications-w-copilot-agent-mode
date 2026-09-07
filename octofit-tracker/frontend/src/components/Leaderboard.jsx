import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import ResourceState from './ResourceState.jsx'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection(leaderboardEndpoint)
      .then((data) => setEntries(data))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section>
      <h1 className="h2 mb-1">Leaderboard</h1>
      <p className="text-secondary mb-4">See who is leading the challenge.</p>
      <ResourceState loading={state.loading} error={state.error} emptyMessage="The leaderboard is empty.">
        {entries.length > 0 && (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead><tr><th>Rank</th><th>Athlete</th><th>Activities</th><th>Points</th></tr></thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={entry._id || entry.user?._id || index}>
                    <td><strong>#{index + 1}</strong></td>
                    <td>{entry.user?.name || entry.user?.username || entry.name || 'Unknown athlete'}</td>
                    <td>{entry.activities ?? entry.activityCount ?? 0}</td>
                    <td><span className="badge text-bg-warning">{entry.points ?? 0}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </ResourceState>
    </section>
  )
}
