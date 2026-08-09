// Base URL of the standalone Express backend (bhaashaseekho_backend). Falls
// back to the local dev backend port so `npm run dev` works out of the box
// without requiring the env var to be set first.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export function apiUrl(path) {
  return `${API_BASE_URL}${path}`;
}
