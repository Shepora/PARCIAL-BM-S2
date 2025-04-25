const express = require('express');
const cors = require('cors');
const client = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// --- RESTAURANTE ---
app.get('/api/restaurantes', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM restaurante');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/restaurantes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('SELECT * FROM restaurante WHERE id_rest = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/restaurantes', async (req, res) => {
  const { nombre, ciudad, direccion, fecha_apertura } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO restaurante (nombre, ciudad, direccion, fecha_apertura) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, ciudad, direccion, fecha_apertura]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/restaurantes/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, ciudad, direccion, fecha_apertura } = req.body;
  try {
    const result = await client.query(
      'UPDATE restaurante SET nombre = $1, ciudad = $2, direccion = $3, fecha_apertura = $4 WHERE id_rest = $5 RETURNING *',
      [nombre, ciudad, direccion, fecha_apertura, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/restaurantes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('DELETE FROM restaurante WHERE id_rest = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- EMPLEADO ---
app.get('/api/empleados', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM empleado');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/empleados/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('SELECT * FROM empleado WHERE id_empleado = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/empleados', async (req, res) => {
  const { nombre, rol, id_rest } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO empleado (nombre, rol, id_rest) VALUES ($1, $2, $3) RETURNING *',
      [nombre, rol, id_rest]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/empleados/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, rol, id_rest } = req.body;
  try {
    const result = await client.query(
      'UPDATE empleado SET nombre = $1, rol = $2, id_rest = $3 WHERE id_empleado = $4 RETURNING *',
      [nombre, rol, id_rest, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/empleados/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('DELETE FROM empleado WHERE id_empleado = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- PRODUCTO ---
app.get('/api/productos', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM producto');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/productos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('SELECT * FROM producto WHERE id_prod = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/productos', async (req, res) => {
  const { nombre, precio } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO producto (nombre, precio) VALUES ($1, $2) RETURNING *',
      [nombre, precio]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/productos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;
  try {
    const result = await client.query(
      'UPDATE producto SET nombre = $1, precio = $2 WHERE id_prod = $3 RETURNING *',
      [nombre, precio, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/productos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('DELETE FROM producto WHERE id_prod = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- PEDIDO ---
app.get('/api/pedidos', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM pedido');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/pedidos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('SELECT * FROM pedido WHERE id_pedido = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/pedidos', async (req, res) => {
  const { fecha, id_rest, total } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO pedido (fecha, id_rest, total) VALUES ($1, $2, $3) RETURNING *',
      [fecha, id_rest, total]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/pedidos/:id', async (req, res) => {
  const { id } = req.params;
  const { fecha, id_rest, total } = req.body;
  try {
    const result = await client.query(
      'UPDATE pedido SET fecha = $1, id_rest = $2, total = $3 WHERE id_pedido = $4 RETURNING *',
      [fecha, id_rest, total, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/pedidos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('DELETE FROM pedido WHERE id_pedido = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- DETALLEPEDIDO ---
app.get('/api/detallepedidos', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM detallepedido');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/detallepedidos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('SELECT * FROM detallepedido WHERE id_detalle = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/detallepedidos', async (req, res) => {
  const { id_pedido, id_prod, cantidad, subtotal } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO detallepedido (id_pedido, id_prod, cantidad, subtotal) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_pedido, id_prod, cantidad, subtotal]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/detallepedidos/:id', async (req, res) => {
  const { id } = req.params;
  const { id_pedido, id_prod, cantidad, subtotal } = req.body;
  try {
    const result = await client.query(
      'UPDATE detallepedido SET id_pedido = $1, id_prod = $2, cantidad = $3, subtotal = $4 WHERE id_detalle = $5 RETURNING *',
      [id_pedido, id_prod, cantidad, subtotal, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/detallepedidos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('DELETE FROM detallepedido WHERE id_detalle = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ====== Obtener todos los productos de un pedido específico =======
app.get('/api/pedidos/:id/productos', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query(`
      SELECT p.*
      FROM producto p
      JOIN detallepedido dp ON p.id_prod = dp.id_prod
      WHERE dp.id_pedido = $1
    `, [id]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ====== Obtener productos más vendidos (más de X unidades) ======
app.get('/api/productos/mas-vendidos/:cantidad', async (req, res) => {
  const { cantidad } = req.params;
  try {
    const result = await client.query(`
      SELECT p.*, SUM(dp.cantidad) AS total_vendido
      FROM producto p
      JOIN detallepedido dp ON p.id_prod = dp.id_prod
      GROUP BY p.id_prod
      HAVING SUM(dp.cantidad) > $1
    `, [cantidad]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//=====Obtener total de ventas por restaurante========
app.get('/api/restaurantes/ventas/:id_rest', async (req, res) => {
  const { id_rest } = req.params;
  try {
    const result = await client.query(`
      SELECT 
        r.id_rest, 
        r.nombre, 
        COALESCE(SUM(dp.cantidad * p.precio), 0) AS total_ventas
      FROM restaurante r
      LEFT JOIN pedido ped ON r.id_rest = ped.id_rest
      LEFT JOIN detallepedido dp ON ped.id_pedido = dp.id_pedido
      LEFT JOIN producto p ON dp.id_prod = p.id_prod
      WHERE r.id_rest = $1
      GROUP BY r.id_rest, r.nombre
    `, [id_rest]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== Obtener pedidos realizados en una fecha específica ======
app.get('/api/pedidos/fecha/:fecha', async (req, res) => {
  const { fecha } = req.params;
  try {
    const result = await client.query(`
      SELECT *
      FROM pedido
      WHERE DATE(fecha) = $1
    `, [fecha]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== Obtener empleados por restaurante y rol =====
app.get('/api/empleados/:id_rest/:rol', async (req, res) => {
  const { id_rest, rol } = req.params;
  console.log("id_rest:", id_rest, "rol:", rol);

  try {
    const result = await client.query(
      `
      SELECT *
      FROM empleado
      WHERE id_rest = CAST($1 AS INT) 
        AND LOWER(rol) = LOWER($2)
      `,
      [id_rest, rol]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== SERVIDOR ====================
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });