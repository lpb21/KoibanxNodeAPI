const { modeloProcessingStatus, modeloTablaYourTable } = require('../models/koibanx');

const getTaskStatus = async (taskId) => {
    // 📌 Buscar el estado de la tarea en `processingStatus`
    const status = await modeloProcessingStatus.findByPk(taskId);
    if (!status) {
        throw new Error('Task not found.');
    }

    // 📌 Si la tarea está "done", obtener los datos insertados en `yourTable`
    let data = [];
    if (status.status === "done") {
        data = await modeloTablaYourTable.findAll({ 
            where: { taskId }, 
            attributes: ['Nombre', 'Edad', 'Nums']  // Seleccionar solo las columnas relevantes
        });
    }

    return {
        status: status.status,  // "pending", "done", "error"
        data,  // Datos insertados
        errors: status.errors ? JSON.parse(status.errors) : []  // Errores detectados
    };
};

const getTaskErrors = async (taskId, page = 1, limit = 10) => {
    try {
    const task = await modeloProcessingStatus.findByPk(taskId);
    if (!task) {
        return { message: 'Task not found' };
    }

    // 📌 Si la tarea no tiene errores registrados, devolver mensaje vacío
    if (!task.errors || task.errors === 'null') {
        return { taskId, totalErrors: 0, page, limit, errors: [] };
    }

    // 📌 Convertir los errores a un array de objetos JSON
    let errors = JSON.parse(task.errors);

    // 📌 Paginación
    const totalErrors = errors.length;
    const startIndex = (Number(page) - 1) * Number(limit);
    const paginatedErrors = errors.slice(startIndex, startIndex + Number(limit));

    return {
        taskId,
        totalErrors,
        page: Number(page),
        limit: Number(limit),
        errors: paginatedErrors
    };
} catch (error) {
    console.error("❌ Error en `getTaskErrors`:", error);
    throw new Error('Error retrieving task errors');
}
};

module.exports = { getTaskStatus, getTaskErrors };