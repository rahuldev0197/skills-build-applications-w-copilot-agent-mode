import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import ResourceState from './ResourceState.jsx'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection(teamsEndpoint)
      .then((data) => setTeams(data))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section>
      <h1 className="h2 mb-1">Teams</h1>
      <p className="text-secondary mb-4">Train together and keep each other motivated.</p>
      <ResourceState loading={state.loading} error={state.error} emptyMessage="No teams have been created yet.">
        {teams.length > 0 && (
          <div className="row g-3">
            {teams.map((team) => (
              <div className="col-md-6" key={team._id || team.name}>
                <article className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h2 className="h5">{team.name}</h2>
                    <p className="text-secondary">{team.description || 'No description provided.'}</p>
                    <span className="badge text-bg-secondary">{team.members?.length || team.memberCount || 0} members</span>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </ResourceState>
    </section>
  )
}
