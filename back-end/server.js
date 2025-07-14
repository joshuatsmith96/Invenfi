const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

const JWT_SECRET = "your_jwt_secret_here"; // Change to env var in prod

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "invenfi",
  password: "newpassword",
  port: 5432,
});

// Middleware to authenticate JWT from cookie
function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

// Register
app.post("/register", async (req, res) => {
  const { company_name, company_type, first_name, last_name, email, username, password } = req.body;

  if (!company_name || !first_name || !last_name || !email || !username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (
        company_name, company_type, first_name, last_name,
        email, username, password
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, email, username, created_at`,
      [company_name, company_type, first_name, last_name, email, username, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully", user: result.rows[0] });
  } catch (err) {
    console.error("Registration error:", err);
    if (err.code === "23505") {
      res.status(409).json({ error: "Email or username already exists" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Missing username or password" });

  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (result.rows.length === 0) return res.status(401).json({ error: "Invalid username or password" });

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid username or password" });

    // Create JWT payload (exclude password)
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    // Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // set to true if HTTPS in production
      maxAge: 3600000, // 1 hour
    });

    res.json({ message: "Login successful", user: payload });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get current logged-in user
app.get("/me", authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Logout
app.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false, // true if using HTTPS
    sameSite: 'lax',
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
