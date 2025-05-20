/**
 * A simple wrapper around fetch that always includes the GET method
 * to prevent "Method Not Allowed" errors
 */
export function fetchWithMethod(url, options = {}) {
  return fetch(url, {
    method: 'GET',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(options.headers || {})
    }
  });
} 