const { Sequelize, QueryTypes } = require("sequelize");
const tedious = require("tedious");
const { Config } = require("../src/config/index")

// *Conexion a BD MsSQL
const sequelizeMsSQL = new Sequelize (
  Config.mssql_db, 
  Config.mssql_usr_adm, 
  Config.mssql_pass_adm, 
  {
  host: Config.mssql_host,//'localhost',
  dialect: Config.mssql_dialect,
  dialectModule: tedious,
  pool: {
    max: Config.mssql_pool_max,
    min: Config.mssql_pool_min,
    acquire: Config.mssql_pool_acquire,
    idle: Config.mssql_pool_idle
  },
  dialectOptions: {
    connectTimeout: Config.mssql_connect_timeout, // Tiempo de espera en milisegundos
  },
  logging: false, // 📌 Desactiva logs de SQL para mejor rendimiento
});

// * Verificacion de la autenticacion con MsSQL
 async function mssql() {
  try {
    await sequelizeMsSQL.authenticate();
    console.log("conexion exitosa con MsSQL");
  } catch (error) {
    console.log("Error al conectar con MsSQL:", error);
  }
}
mssql();

module.exports = { 
  sequelizeMsSQL
};
