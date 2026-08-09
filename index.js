import express from "express";
import { config } from "dotenv";
import pg from "pg";

config();

const app = express();
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true 
});

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente!");
});

app.get("/ping", async (req, res) => {
  const result = await pool.query("SELECT now()");
  res.send(`eres mi cata, como dice la niña jajajajaja! ${result.rows[0].now}`);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

