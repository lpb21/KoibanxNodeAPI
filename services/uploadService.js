const xlsx = require('xlsx');
const { modeloProcessingStatus, modeloTablaYourTable } = require('../models/koibanx');
const { processExcel } = require('../useCases/processExcel');

// Función para procesar el archivo Excel
const processFile = async (filePath, fileName, format) => {
    try {
        // Crear registro en la base de datos con estado "pending"
        const processingStatus = await modeloProcessingStatus.create({
            status: 'pending',
            filePath,
            fileName
          });
          //console.log(15,'📌 Processing status created:', processingStatus);
          
        // 📌 Procesar el archivo en segundo plano
        setImmediate(async () => {
            try {
                await processExcel(filePath, processingStatus.id, format);
            } catch (error) {
                console.error('❌ Error en procesamiento:', error);
                await modeloProcessingStatus.update(
                    { status: 'error', errors: JSON.stringify([{ message: error.message }]) },
                    { where: { id: processingStatus.id } }
                );
            }
        }, filePath, processingStatus.id, format);

        // 📌 Devolvemos el `taskId` de inmediato
        return { message: "Archivo procesado con éxito", taskId: processingStatus.id };

    } catch (error) {
        console.error('❌ Error en processFile:', error);
        throw new Error('Error procesando archivo');
    };
    }

module.exports = { processFile }