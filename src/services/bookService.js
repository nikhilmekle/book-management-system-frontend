

const BASE = import.meta.env.VITE_API_BASE_URL;

async function request(path, init) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init
  });
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.message) msg = body.message;
    } catch {/* ignore */}
    throw new Error(msg);
  }
  if (res.status === 204) return undefined;
  return res.json();
}

export const fetchBooks = () => request('/books');
export const fetchBookById = (id) => request(`/books/${id}`);
export const createBook = (data) =>
request('/books', { method: 'POST', body: JSON.stringify(data) });
export const updateBook = (id, data) =>
request(`/books/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteBook = (id) =>
request(`/books/${id}`, { method: 'DELETE' });