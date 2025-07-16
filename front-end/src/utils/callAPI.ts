const API_BASE = 'http://localhost:3000'; // adjust if needed

interface RegisterData {
  company_name: string;
  company_type?: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
}

interface LoginData {
  username: string;
  password: string;
}

export interface User {
  id: number;
  company_name: string;
  company_type?: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  created_at: string;
}

async function register(data: RegisterData): Promise<{ message: string; user: User }> {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Registration failed');
  }

  return res.json();
}

async function login(data: LoginData): Promise<{ message: string; user: User }> {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // <=== IMPORTANT: send cookies with request
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Login failed');
  }

  return res.json();
}

async function getUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/users`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to fetch users');
  }

  return res.json();
}

// NEW: fetch current logged in user (requires cookie)
async function getMe(): Promise<{ user: User }> {
  const res = await fetch(`${API_BASE}/me`, {
    method: 'GET',
    credentials: 'include', // <=== send cookie
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Not authenticated');
  }

  return res.json();
}

// NEW: logout user (clears cookie)
async function logout(): Promise<void> {
  const res = await fetch(`${API_BASE}/logout`, {
    method: 'POST',
    credentials: 'include', // <=== send cookie
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Logout failed');
  }
}

export const callAPI = {
  register,
  login,
  getUsers,
  getMe,
  logout,
};
