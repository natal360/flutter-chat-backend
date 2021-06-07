/*

  path: api/login

*/

const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.post('/new', [
  // 検証
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'La contrasena es obligatorio').not().isEmpty(),
  check('email', 'El correo es obligatorio').isEmail(),
  validarCampos
], crearUsuario);


router.post('/', [
  check('password', 'La contrasena es obligatorio').not().isEmpty(),
  check('email', 'El correo es obligatorio').isEmail(),
], login);


// validarJWT
router.get('/renew', validarJWT, renewToken);


module.exports = router;