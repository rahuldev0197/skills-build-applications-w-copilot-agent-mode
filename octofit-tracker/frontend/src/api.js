const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function collectionFromResponse(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  if (Array.isArray(payload?.data?.items)) return payload.data.items
  return []
}

export async function fetchCollection(componentOrUrl) {
  const endpoint = componentOrUrl.startsWith('http')
    ? componentOrUrl
    : `${apiBaseUrl}/${componentOrUrl}/`
  const response = await fetch(endpoint)
  if (!response.ok) {
    throw new Error(`Unable to load ${component} (${response.status})`)
  }
  return collectionFromResponse(await response.json())
}
