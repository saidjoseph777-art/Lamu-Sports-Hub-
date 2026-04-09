const API_URL = 'https://YOUR-RAILWAY-URL.railway.app/api'; // Change this!

async function api(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const token = localStorage.getItem('lamu_token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    },
    ...options
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(url, config);
  const data = await response.json();
  
  if (!response.ok) throw new Error(data.message || 'Error');
  return data;
}

window.lamuAPI = {
  auth: {
    registerPin: (name, pin, role) => api('/auth/register-pin', { method: 'POST', body: { name, pin, role } }),
    loginPin: (name, pin) => api('/auth/login-pin', { method: 'POST', body: { name, pin } }),
    googleLogin: (data) => api('/auth/google', { method: 'POST', body: data }),
    getMe: () => api('/auth/me')
  },
  teams: { getAll: () => api('/teams').then(r => r.teams) },
  matches: { getAll: (q) => api(`/matches?${new URLSearchParams(q)}`).then(r => r.matches) },
  players: { getAll: () => api('/players').then(r => r.players) },
  news: { getAll: () => api('/news').then(r => r.news) },
  standings: { getTable: () => api('/standings').then(r => r.standings) }
};
