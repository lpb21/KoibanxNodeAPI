const { modeloTablaYourTable, modeloProcessingStatus } = require('../models/koibanx');
const { parseExcel } = require('../utils/parseExcel');

const processExcel = async (filePath, taskId, format) => {
    try {
        // 📌 Extraemos y validamos los datos desde el Excel
        const { validData, errors } = await parseExcel(filePath, format);

        console.log(9,'✅ Datos Validados e insertados:', validData);
        console.log(10,'🚨 Errores Detectados:', errors);

        // 📌 Agregar `taskId` a cada registro antes de insertarlo en la BD
        const validDataWithTaskId = validData.map(row => ({
            ...row,          // Mantener el resto de los datos
            taskId: taskId   // Agregar el ID de la tarea
        }));

        // 📌 Insertar datos en lotes (BULK INSERT en bloques de 5000)
        const batchSize = 5000;
        for (let i = 0; i < validDataWithTaskId.length; i += batchSize) {
            const batch = validDataWithTaskId.slice(i, i + batchSize);
            await modeloTablaYourTable.bulkCreate(batch);
        }

        // 📌 Actualizamos el estado de la tarea
        await modeloProcessingStatus.update(
            {
                status: errors.length > 0 ? 'error' : 'done',
                errors: errors.length > 0 ? JSON.stringify(errors) : null
            },
            { where: { id: taskId } }
        );

    } catch (error) {
        console.error('❌ Error en `processExcel`:', error);
        throw new Error('Error procesando archivo');
    }
};

module.exports = { processExcel };