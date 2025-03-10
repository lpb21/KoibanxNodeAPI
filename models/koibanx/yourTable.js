const { DataTypes } = require('sequelize');
const { sequelizeMsSQL } = require('../../db/database');

// Definición del modelo Card
// recibe 3 argumentos:
//1 el nombre del modelo o tabla,
//2 atributos
//3 opciones
const modeloTablaYourTable = sequelizeMsSQL.define
('YourTable', 
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Nombre: {
      type: DataTypes.STRING,
      //primaryKey: true,
      //autoIncrement: true,
      allowNull: true
    },
    Edad: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Nums: {
      //type: DataTypes.JSON,
      type: DataTypes.TEXT, // Se almacena como JSON
      allowNull: true
    }
  },
  {
    // La tabla se llama igual al nombre que se definió arriba
    freezeTableName: true,
    // Evita la creación de las columnas createdAt y updatedAt
    timestamps: false,
    // Indica que no se utilizará la columna por defecto 'id'
    id: false
  }
);

// Remueve el campo "id" que Sequelize genera por defecto
//modeloTablaYourTable.removeAttribute('id');

module.exports = {
    modeloTablaYourTable
}
