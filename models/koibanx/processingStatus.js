const { DataTypes } = require('sequelize');
const { sequelizeMsSQL } = require('../../db/database');

// Definición del modelo Card
// recibe 3 argumentos:
//1 el nombre del modelo o tabla,
//2 atributos
//3 opciones
const modeloProcessingStatus  = sequelizeMsSQL.define
('ProcessingStatus', 
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
      //allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    errors: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false
  }
  },
  {
    // La tabla se llama igual al nombre que se definió arriba
    freezeTableName: true,
    // Evita la creación de las columnas createdAt y updatedAt
    timestamps: false,
  }
);

module.exports = {
    modeloProcessingStatus
}
