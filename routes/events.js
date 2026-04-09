/*
    Rutas de Eventos 
    host + /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getEventos, getEventosAll, crearEvento, actualizarEvento, borrarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { isDate } = require('../helpers/isDate');

const router = Router();

// Cualquier ruta definida despues de esta instrucción ejecutará implicitamente el middleware validarJWT
router.use(validarJWT);

router.get(
    '/all',
    getEventosAll
);

router.get(
    '/',
    getEventos
);

router.post(
    '/',
    [
        check('title', 'title es obligatorio').not().isEmpty(),
        check('start', 'Start es obligatorio').custom(isDate),
        check('end', 'End es obligatorio').isNumeric().not().isEmpty(),
        validarCampos,
    ],
    crearEvento
);

router.put(
    '/:id',
    [
        check('title', 'title es obligatorio').not().isEmpty(),
        check('start', 'Start es obligatorio').custom(isDate),
        check('end', 'End es obligatorio').isNumeric().not().isEmpty(),
        validarCampos,
    ],
    actualizarEvento
);

router.delete(
    '/:id',
    borrarEvento
);

module.exports = router;