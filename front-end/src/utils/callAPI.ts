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

export interface InventoryItem {
  id: number;
  name: string;
  location?: string | null;
  stock: number;
  user_id: number;
  created_at: string;
  updated_at: string;
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
async function getMe(): Promise<{ user: User } | null> {
  const res = await fetch(`${API_BASE}/me`, {
    method: 'GET',
    credentials: 'include', // <=== send cookie
  });

  if (res.status === 401 || res.status === 403) {
    // Token expired or invalid — clear session
    try {
      await logout(); // optional: clear server-side cookie
    } catch (logoutErr) {
      console.error('Logout cleanup failed:', logoutErr);
    }
    return null;
  }

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to fetch user');
  }

  return res.json(); // { user: ... }
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

// Fetch all inventory items for the logged-in user
async function getInventory(): Promise<{ items: InventoryItem[] }> {
  const res = await fetch(`${API_BASE}/inventory`, {
    method: 'GET',
    credentials: 'include', // send cookie for auth
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to fetch inventory');
  }

  return res.json(); // { items: [...] }
}

// Create a new inventory item
interface NewInventoryItem {
  name: string;
  location?: string;
  stock?: number;
}

async function createInventoryItem(data: NewInventoryItem): Promise<{ message: string; item: InventoryItem }> {
  const res = await fetch(`${API_BASE}/inventory`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to create inventory item');
  }

  return res.json();
}

// DELETE inventory item by id
async function deleteInventoryItem(id: number): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/api/inventory/${id}`, {
    method: 'DELETE',
    credentials: 'include', // send cookie for auth
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to delete inventory item');
  }

  return res.json();
}

export const callAPI = {
  register,
  login,
  getUsers,
  getMe,
  logout,
  createInventoryItem,
  getInventory,
  deleteInventoryItem,  // added here
};