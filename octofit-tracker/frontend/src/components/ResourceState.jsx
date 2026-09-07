export default function ResourceState({ loading, error, emptyMessage, children }) {
  if (loading) {
    return <div className="alert alert-light border">Loading...</div>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  return children || <div className="alert alert-light border">{emptyMessage}</div>
}
