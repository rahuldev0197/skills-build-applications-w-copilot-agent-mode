import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import ResourceState from './ResourceState.jsx'

export default function Users() {
  const [users, setUsers] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection('users')
      .then((data) => setUsers(data))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section>
      <h1 className="h2 mb-1">Athletes</h1>
      <p className="text-secondary mb-4">Everyone making progress with OctoFit.</p>
      <ResourceState loading={state.loading} error={state.error} emptyMessage="No athletes registered yet.">
        {users.length > 0 && (
          <div className="row g-3">
            {users.map((user) => (
              <div className="col-md-6 col-lg-4" key={user._id || user.username}>
                <article className="card h-100 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center gap-3">
                      <div className="avatar">{(user.name || user.username || '?').charAt(0).toUpperCase()}</div>
                      <div><h2 className="h5 mb-1">{user.name || user.username}</h2><p className="text-secondary mb-0">@{user.username}</p></div>
                    </div>
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
