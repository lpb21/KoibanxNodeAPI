const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Crear el directorio "uploads" si no existe
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configurar almacenamiento de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Validar tipo de archivo
const fileFilter = (req, file, cb) => {
    if (path.extname(file.originalname) !== '.xlsx') {
        return cb(new Error('Only .xlsx files are allowed!'));
    }
    cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;