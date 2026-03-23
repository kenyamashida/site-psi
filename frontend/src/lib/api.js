/**
 * URL da API
 * - Em localhost: usa '' (URLs relativas) → Vite proxy encaminha /api ao backend
 * - Em produção: usa a URL do backend
 */
const isLocal = typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

export const API_URL =
  import.meta.env.VITE_API_URL ||
  (isLocal ? '' : 'https://site-psi.onrender.com');
