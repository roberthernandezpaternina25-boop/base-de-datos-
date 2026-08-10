import express from "express";
import { config } from "dotenv";
import pg from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

config();

const JWT_SECRET = process.env.JWT_SECRET || "cambiar-este-secret";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.get("/prueba", (req, res) => {
  res.send("La ruta de prueba funciona");
});

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Crear tabla de usuarios si no existe
async function crearTablaUsuarios() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        apellido VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        telefono VARCHAR(30) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Tabla users lista");
  } catch (error) {
    console.error("Error creando la tabla users:", error);
  }
}

// Comprobar conexión con PostgreSQL
app.get("/ping", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.send(`Base de datos funcionando: ${result.rows[0].now}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error conectando con la base de datos");
  }
});

// Registrar usuario
app.post("/register", async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      email,
      password,
      telefono
    } = req.body;

    const safeEmail = email?.trim().toLowerCase();

    if (!nombre || !apellido || !safeEmail || !password || !telefono) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios"
      });
    }

    const usuarioExistente = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [safeEmail]
    );

    if (usuarioExistente.rows.length > 0) {
      return res.status(409).json({
        error: "El correo ya está registrado"
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users
       (nombre, apellido, email, password_hash, telefono)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, nombre, apellido, email, telefono, created_at`,
      [
        nombre,
        apellido,
        safeEmail,
        passwordHash,
        telefono
      ]
    );

    const usuario = result.rows[0];
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: '24h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24
    });

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario
    });

  } catch (error) {
    console.error("Error registrando usuario:", error);

    res.status(500).json({
      error: "Error interno del servidor"
    });
  }
});

function getCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24
  };
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const safeEmail = email?.trim().toLowerCase();

    if (!safeEmail || !password) {
      return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }

    const result = await pool.query(
      'SELECT id, nombre, apellido, email, password_hash, telefono FROM users WHERE email = $1',
      [safeEmail]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    const usuario = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, usuario.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: '24h' });

    res.cookie('token', token, getCookieOptions());
    delete usuario.password_hash;

    res.json({
      mensaje: 'Inicio de sesión exitoso',
      usuario
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/me', async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'No autenticado' });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Token inválido' });
  }

  try {
    const result = await pool.query(
      'SELECT id, nombre, apellido, email, telefono, created_at FROM users WHERE id = $1',
      [payload.id]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    res.json({ usuario: result.rows[0] });
  } catch (error) {
    console.error('Error consultando usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/logout', (req, res) => {
  res.clearCookie('token', getCookieOptions());
  res.json({ mensaje: 'Sesión cerrada' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);

  await crearTablaUsuarios();
});