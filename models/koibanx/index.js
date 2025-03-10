const {modeloTablaYourTable} = require('./yourTable');
const {modeloProcessingStatus} = require('./processingStatus');

// Definir la relación entre las tablas
modeloProcessingStatus.hasMany(modeloTablaYourTable, { foreignKey: 'taskId' });
modeloTablaYourTable.belongsTo(modeloProcessingStatus, { foreignKey: 'taskId' });

module.exports = {
    modeloTablaYourTable,
    modeloProcessingStatus
};