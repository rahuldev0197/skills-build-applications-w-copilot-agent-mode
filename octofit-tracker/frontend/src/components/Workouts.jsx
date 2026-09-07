import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import ResourceState from './ResourceState.jsx'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection(workoutsEndpoint)
      .then((data) => setWorkouts(data))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section>
      <h1 className="h2 mb-1">Workouts</h1>
      <p className="text-secondary mb-4">Personalized sessions for your next workout.</p>
      <ResourceState loading={state.loading} error={state.error} emptyMessage="No workouts are available yet.">
        {workouts.length > 0 && (
          <div className="row g-3">
            {workouts.map((workout) => (
              <div className="col-md-6" key={workout._id || workout.title}>
                <article className="card h-100 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between gap-2">
                      <h2 className="h5">{workout.title}</h2>
                      <span className="badge text-bg-info">{workout.difficulty}</span>
                    </div>
                    <p className="text-secondary">{workout.description}</p>
                    <small>{workout.duration} minutes</small>
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
