import express from "express";
import { config } from "dotenv";
import pg from "pg";
import bcrypt from "bcrypt";

config();

const app = express();

app.use(express.json());

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

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

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente!");
});

app.get("/ping", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.send(`Base de datos funcionando: ${result.rows[0].now}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error conectando con la base de datos");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
  await crearTablaUsuarios();
});
