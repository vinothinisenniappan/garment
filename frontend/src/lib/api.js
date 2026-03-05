const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

function toAbsolute(path) {
  if (/^https?:\/\//i.test(path)) {
    return path
  }

  if (!API_BASE_URL) {
    return path
  }

  return `${API_BASE_URL}${path}`
}

export async function apiFetch(path, options = {}) {
  const response = await fetch(toAbsolute(path), {
    credentials: 'include',
    ...options,
    headers: {
      ...(options.headers || {})
    }
  })

  const contentType = response.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const payload = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    const message = isJson
      ? payload.message || `Request failed with status ${response.status}`
      : `Request failed with status ${response.status}`
    throw new Error(message)
  }

  return payload
}

export const apiBaseUrl = API_BASE_URL
