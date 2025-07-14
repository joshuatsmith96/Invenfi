const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'invenfi',
  password: 'newpassword',
  port: 5432,
});

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, company_name, company_type, first_name, last_name, email, username, created_at FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/register', async (req, res) => {
  const {
    company_name,
    company_type,
    first_name,
    last_name,
    email,
    username,
    password
  } = req.body;

  if (!company_name || !first_name || !last_name || !email || !username || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const result = await pool.query(
      `INSERT INTO users (
        company_name, company_type, first_name, last_name,
        email, username, password
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, email, username, created_at`,
      [
        company_name,
        company_type,
        first_name,
        last_name,
        email,
        username,
        hashedPassword
      ]
    );

    // Respond with new user (excluding password)
    res.status(201).json({
      message: 'User registered successfully',
      user: result.rows[0]
    });

  } catch (err) {
    console.error('Registration error:', err);
    if (err.code === '23505') { // unique_violation
      res.status(409).json({ error: 'Email or username already exists' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }

  try {
    // Find user by username
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = result.rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Login successful - respond without password
    const { password: pw, ...userWithoutPassword } = user;
    res.json({
      message: 'Login successful',
      user: userWithoutPassword
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// Basic home route
app.get('/', (req, res) => {
  res.send('Hello from the Express + PostgreSQL server!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
