const express = require('express')
const upload = require('../middlewares/koibanx/multerConfig')
const authMiddleware = require('../middlewares/koibanx/authMiddleware');

const { 
    getTaskStatus,
    getTaskErrors,
    uploadFile,
    generateToken
} = require('../controllers/koibanx')

const router = express.Router()

// 📌 Endpoint para obtener un token de autenticación (temporal para pruebas)
router.post('/auth/token', generateToken);

// 📂 Ruta para subir archivos
router.post('/upload', authMiddleware, upload.single('file'), uploadFile);

// 📂 Rutas para consultar estado y errores de tareas
router.get('/status/:taskId', authMiddleware, getTaskStatus);
router.get('/errors/:taskId', authMiddleware, getTaskErrors);


module.exports = router