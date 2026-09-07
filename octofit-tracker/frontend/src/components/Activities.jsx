import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import ResourceState from './ResourceState.jsx'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection('activities')
      .then((data) => setActivities(data))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 mb-1">Activities</h1>
          <p className="text-secondary mb-0">Recent movement logged by the OctoFit community.</p>
        </div>
        <span className="badge text-bg-primary">{activities.length} recorded</span>
      </div>
      <ResourceState loading={state.loading} error={state.error} emptyMessage="No activities recorded yet.">
        {activities.length > 0 && (
          <div className="row g-3">
            {activities.map((activity) => (
              <div className="col-md-6" key={activity._id || `${activity.type}-${activity.recordedAt}`}>
                <article className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h2 className="h5">{activity.type}</h2>
                    <p className="mb-1">{activity.duration} minutes{activity.distance ? ` · ${activity.distance} km` : ''}</p>
                    <small className="text-secondary">
                      {activity.user?.name || activity.user?.username || 'Unknown athlete'} · {activity.points || 0} points
                    </small>
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
