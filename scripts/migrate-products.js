import { config } from 'dotenv';
import pg from 'pg';
import { readFile } from 'node:fs/promises';

config();
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL no está configurada');
const products = JSON.parse(await readFile(new URL('../data/initial-products.json', import.meta.url), 'utf8'));
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const client = await pool.connect();

try {
  await client.query('BEGIN');
  await client.query('ALTER TABLE productos ADD COLUMN IF NOT EXISTS genero TEXT, ADD COLUMN IF NOT EXISTS subcategoria TEXT, ADD COLUMN IF NOT EXISTS precio_original NUMERIC, ADD COLUMN IF NOT EXISTS imagenes JSONB NOT NULL DEFAULT ' + "'[]'::jsonb" + ', ADD COLUMN IF NOT EXISTS referencia TEXT');
  await client.query('CREATE UNIQUE INDEX IF NOT EXISTS productos_referencia_unique ON productos (referencia)');

  for (const product of products) {
    const reference = 'V7-' + String(product.id).padStart(3, '0');
    await client.query(
      'INSERT INTO productos (referencia, genero, subcategoria, nombre, descripcion, precio, precio_original, imagen_url, imagenes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb) ON CONFLICT (referencia) DO UPDATE SET genero = EXCLUDED.genero, subcategoria = EXCLUDED.subcategoria, nombre = EXCLUDED.nombre, descripcion = EXCLUDED.descripcion, precio = EXCLUDED.precio, precio_original = EXCLUDED.precio_original, imagen_url = EXCLUDED.imagen_url, imagenes = EXCLUDED.imagenes',
      [reference, product.gender, product.subcategory, product.title, product.description, product.price, product.originalPrice ?? null, product.image, JSON.stringify(product.images || [])]
    );
  }

  await client.query('COMMIT');
  console.log('Catálogo importado o actualizado: ' + products.length + ' productos.');
} catch (error) {
  await client.query('ROLLBACK');
  console.error('No se pudo importar el catálogo:', error.message);
  process.exitCode = 1;
} finally {
  client.release();
  await pool.end();
}
