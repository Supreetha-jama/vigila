// Backend origin — overridable via VITE_API_BASE_URL for the eventual Render deploy;
// defaults to the local FastAPI dev server.
export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
