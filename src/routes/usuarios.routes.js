const { Router } = require('express');
const usuarios = require('../controllers/usuarios.controller');

const router = Router();

router.post('/', usuarios.crear);          // Registrar
router.get('/', usuarios.listar);          // Consultar todos
router.get('/:id', usuarios.obtenerPorId); // Consultar por ID
router.put('/:id', usuarios.actualizar);   // Actualizar
router.delete('/:id', usuarios.eliminar);  // Eliminar

module.exports = router;
