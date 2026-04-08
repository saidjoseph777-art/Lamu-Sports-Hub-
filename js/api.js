// API Configuration
const API_URL = 'https://your-backend-url.onrender.com/api'; // Change this to your deployed backend URL

// Token management
const getToken = () => localStorage.getItem('lamu_token');
const setToken = (token) => localStorage.setItem('lamu_token', token);
const removeToken = () => localStorage.removeItem('lamu_token');

// API Helper
async function api(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(getToken() && { 'Authorization': `Bearer ${getToken()}` }),
      ...options.headers
    },
    ...options
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Auth API
const auth = {
  async registerPin(name, pin, role) {
    const data = await api('/auth/register-pin', {
      method: 'POST',
      body: { name, pin, role }
    });
    setToken(data.token);
    return data;
  },

  async loginPin(name, pin) {
    const data = await api('/auth/login-pin', {
      method: 'POST',
      body: { name, pin }
    });
    setToken(data.token);
    return data;
  },

  async googleLogin(googleData) {
    const data = await api('/auth/google', {
      method: 'POST',
      body: googleData
    });
    setToken(data.token);
    return data;
  },

  async getMe() {
    return await api('/auth/me');
  },

  async updateProfile(profileData) {
    return await api('/auth/update-profile', {
      method: 'PUT',
      body: profileData
    });
  },

  async deleteAccount() {
    return await api('/auth/delete-account', {
      method: 'DELETE'
    });
  },

  logout() {
    removeToken();
    currentUser = null;
  }
};

// Teams API
const teams = {
  async getAll() {
    const data = await api('/teams');
    return data.teams;
  },

  async getById(id) {
    const data = await api(`/teams/${id}`);
    return data.team;
  },

  async create(teamData) {
    return await api('/teams', {
      method: 'POST',
      body: teamData
    });
  },

  async update(id, teamData) {
    return await api(`/teams/${id}`, {
      method: 'PUT',
      body: teamData
    });
  }
};

// Matches API
const matches = {
  async getAll(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    const data = await api(`/matches?${query}`);
    return data.matches;
  },

  async getLive() {
    const data = await api('/matches/live');
    return data.matches;
  },

  async create(matchData) {
    return await api('/matches', {
      method: 'POST',
      body: matchData
    });
  },

  async update(id, matchData) {
    return await api(`/matches/${id}`, {
      method: 'PUT',
      body: matchData
    });
  }
};

// Players API
const players = {
  async getAll(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    const data = await api(`/players?${query}`);
    return data.players;
  },

  async create(playerData) {
    return await api('/players', {
      method: 'POST',
      body: playerData
    });
  },

  async updateStats(id, stats) {
    return await api(`/players/${id}/stats`, {
      method: 'PUT',
      body: stats
    });
  }
};

// News API
const news = {
  async getAll() {
    const data = await api('/news');
    return data.news;
  },

  async create(newsData) {
    return await api('/news', {
      method: 'POST',
      body: newsData
    });
  },

  async react(id, type) {
    return await api(`/news/${id}/react`, {
      method: 'POST',
      body: { type }
    });
  }
};

// Standings API
const standings = {
  async getTable() {
    const data = await api('/standings');
    return data.standings;
  }
};

// Predictions API
const predictions = {
  async make(matchId, homeScore, awayScore) {
    return await api('/predictions', {
      method: 'POST',
      body: { matchId, homeScore, awayScore }
    });
  },

  async getLeaderboard() {
    const data = await api('/predictions/leaderboard');
    return data.leaderboard;
  }
};

// Export for use in main app
window.lamuAPI = { auth, teams, matches, players, news, standings, predictions };
