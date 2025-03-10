require("dotenv").config();

module.exports.Config = {
  port: process.env.PORT,

  //* Variables SQL Server
  mssql_host: process.env.DB_HOST,
  mssql_dialect: process.env.DB_DIALECT,
  mssql_db: process.env.DB_NAME,
  mssql_usr_adm: process.env.DB_USER,
  mssql_pass_adm: process.env.DB_PASSWORD,

  //* Configuración del pool de conexiones
  mssql_pool_max: parseInt(process.env.DB_POOL_MAX),
  mssql_pool_min: parseInt(process.env.DB_POOL_MIN),
  mssql_pool_acquire: parseInt(process.env.DB_POOL_ACQUIRE),
  mssql_pool_idle: parseInt(process.env.DB_POOL_IDLE),

  //* Tiempo de espera en la conexión
  mssql_connect_timeout: parseInt(process.env.DB_CONNECT_TIMEOUT),

  jwt_secret: process.env.JWT_SECRET,
  jwt_expiration: process.env.JWT_EXPIRATION,

  cors_origin: process.env.CORS_ORIGIN
};

