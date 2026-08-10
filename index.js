import express from "express";
import { config } from "dotenv";
import pg from "pg";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
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

    if (!nombre || !apellido || !email || !password || !telefono) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios"
      });
    }

    const usuarioExistente = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
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
        email,
        passwordHash,
        telefono
      ]
    );

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: result.rows[0]
    });

  } catch (error) {
    console.error("Error registrando usuario:", error);

    res.status(500).json({
      error: "Error interno del servidor"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);

  await crearTablaUsuarios();
});