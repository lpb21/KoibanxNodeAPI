const uploadService = require('../../services/uploadService');

const uploadFile = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }

      // Obtener el formato de mapeo desde la solicitud (por defecto "full")
      const format = req.body.format || "full"; // "full" = {Nombre, Edad, Nums}, "minimal" = {Nombre, Edad}
      // Llamar al servicio para procesar el archivo
      const result = await uploadService.processFile(req.file.path, req.file.filename, format)

        res.status(200).json(result);
    } catch (error) {
        console.error(30,'❌ Error in uploadFile:', error);
      res.status(500).json({ error: 'Error uploading file' });
    }
  };

  module.exports = {
    uploadFile
  }