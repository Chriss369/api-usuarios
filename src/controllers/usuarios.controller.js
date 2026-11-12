const pool = require('../config/db');

const correoValido = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

// Valida los datos de entrada; devuelve un mensaje de error o null
const validarUsuario = ({ nombre, correo, edad }) => {
  if (!nombre || !correo) return 'Los campos nombre y correo son obligatorios';
  if (typeof nombre !== 'string' || nombre.trim().length < 3)
    return 'El nombre debe tener al menos 3 caracteres';
  if (!correoValido(correo)) return 'El correo no tiene un formato válido';
  if (edad !== undefined && edad !== null && (!Number.isInteger(edad) || edad < 0 || edad > 120))
    return 'La edad debe ser un número entero entre 0 y 120';
  return null;
};

const idValido = (id) => /^\d+$/.test(id);

// POST /usuarios -> Registrar
exports.crear = async (req, res) => {
  const error = validarUsuario(req.body);
  if (error) return res.status(400).json({ mensaje: error });

  const { nombre, correo, edad } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, correo, edad) VALUES ($1, $2, $3) RETURNING *',
      [nombre.trim(), correo.trim(), edad ?? null]
    );
    res.status(201).json({ mensaje: 'Usuario registrado', usuario: result.rows[0] });
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ mensaje: 'El correo ya está registrado' });
    res.status(500).json({ mensaje: 'Error del servidor', error: err.message });
  }
};

// GET /usuarios -> Consultar todos
exports.listar = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios ORDER BY id');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error del servidor', error: err.message });
  }
};

// GET /usuarios/:id -> Consultar por ID
exports.obtenerPorId = async (req, res) => {
  const { id } = req.params;
  if (!idValido(id)) return res.status(400).json({ mensaje: 'El id debe ser un número' });

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error del servidor', error: err.message });
  }
};

// PUT /usuarios/:id -> Actualizar
exports.actualizar = async (req, res) => {
  const { id } = req.params;
  if (!idValido(id)) return res.status(400).json({ mensaje: 'El id debe ser un número' });

  const error = validarUsuario(req.body);
  if (error) return res.status(400).json({ mensaje: error });

  const { nombre, correo, edad } = req.body;
  try {
    const result = await pool.query(
      'UPDATE usuarios SET nombre = $1, correo = $2, edad = $3 WHERE id = $4 RETURNING *',
      [nombre.trim(), correo.trim(), edad ?? null, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.status(200).json({ mensaje: 'Usuario actualizado', usuario: result.rows[0] });
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ mensaje: 'El correo ya está registrado' });
    res.status(500).json({ mensaje: 'Error del servidor', error: err.message });
  }
};

// DELETE /usuarios/:id -> Eliminar
exports.eliminar = async (req, res) => {
  const { id } = req.params;
  if (!idValido(id)) return res.status(400).json({ mensaje: 'El id debe ser un número' });

  try {
    const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.status(200).json({ mensaje: 'Usuario eliminado', usuario: result.rows[0] });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error del servidor', error: err.message });
  }
};
