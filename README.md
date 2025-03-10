# 🗂️ API - Procesamiento de Archivos Excel con Node.js y MsSQL

## 📌 Contenido
- [📖 Introducción](#-introducción)
- [⚙️ Requisitos Previos](#️-requisitos-previos)
- [📂 Estructura del Proyecto](#-estructura-del-proyecto)
- [💾 Creación de la Base de Datos](#-creación-de-la-base-de-datos)
- [🚀 Instalación y Despliegue](#-instalación-y-despliegue)
- [🔑 Autenticación con JWT](#-autenticación-con-jwt)
- [📡 Endpoints de la API](#-endpoints-de-la-api)
- [📤 Ejemplo de Uso en Postman](#-ejemplo-de-uso-en-postman)
- [🎥 Video Demostrativo](#-video-demostrativo)

---

## 📖 Introducción
Esta API permite la **carga y procesamiento de archivos Excel**, guardando la información en **Microsoft SQL Server (MsSQL)** y permitiendo la consulta del estado de la tarea. Se implementa autenticación con **JWT** para proteger los endpoints.

---

## ⚙️ Requisitos Previos
Antes de desplegar la API, asegúrate de tener instalado:
- **Node.js** (v16 o superior)
- **Microsoft SQL Server (MsSQL)**
- **Postman** (opcional, para pruebas de API)
- **Git** (opcional, para clonar el repositorio)

---

## 📂 Estructura del Proyecto
```

📦 KOIBANXBACK  
 ┣ 📂 controllers  
 ┃ ┣ 📂 koibanx  
 ┃ ┃ ┣ 📜 authController.js  
 ┃ ┃ ┣ 📜 taskController.js  
 ┃ ┃ ┣ 📜 uploadController.js  
 ┃ ┃ ┗ 📜 index.js  
 ┃ ┗ 📜 index.js  
 ┣ 📂 db  
 ┃ ┗ 📜 database.js  
 ┣ 📂 middlewares  
 ┃ ┣ 📂 koibanx  
 ┃ ┃ ┣ 📜 authMiddleware.js  
 ┃ ┃ ┣ 📜 errorHandler.js  
 ┃ ┃ ┗ 📜 multerConfig.js  
 ┣ 📂 uploads 
 ┣ 📂 models  
 ┃ ┣ 📂 koibanx  
 ┃ ┃ ┣ 📜 processingStatus.js  
 ┃ ┃ ┗ 📜 yourTable.js  
 ┃ ┗ 📜 index.js  
 ┣ 📂 routes  
 ┃ ┗ 📜 routes.js  
 ┣ 📂 services  
 ┃ ┣ 📜 taskService.js  
 ┃ ┗ 📜 uploadService.js  
 ┣ 📂 src  
 ┃ ┣ 📂 config  
 ┃ ┗ 📂 useCases  
 ┣ 📂 utils  
 ┃ ┣ 📜 processExcel.js  
 ┃ ┗ 📜 parseExcel.js  
 ┣ 📜 .env  
 ┣ 📜 .gitignore  
 ┣ 📜 ecosystem.config.js  
 ┣ 📜 package-lock.json  
 ┣ 📜 package.json  
 ┣ 📜 README.md  
 ┗ 📜 server.js

📌 Descripción de Carpetas
📂 controllers/ → Manejo de las solicitudes HTTP y lógica de negocio.
📂 middlewares/ → Middleware de autenticación, errores y configuración de subida de archivos.
📂 models/ → Definición de modelos de la base de datos.
📂 routes/ → Definición de rutas del backend.
📂 services/ → Contiene la lógica de negocio de la aplicación.
📂 uploads/ → Carpeta donde se almacenan los archivos subidos.
📂 utils/ → Funciones auxiliares para manipular archivos y otros procesos.
📂 src/ → Contiene configuraciones y casos de uso.
📜 server.js → Archivo principal que inicia el servidor.
```

---

## 💾 Creación de la Base de Datos
Ejecuta estos scripts en **Microsoft SQL Server** para crear las tablas necesarias, despues de **crear tu base de datos**:

```sql
CREATE TABLE ProcessingStatus (
    id INT IDENTITY(1,1) PRIMARY KEY,
    status NVARCHAR(50) NOT NULL,   -- "pending", "done", "error"
    errors NVARCHAR(MAX) NULL,      -- Guarda un JSON con los errores
    filePath NVARCHAR(500) NOT NULL,
    fileName NVARCHAR(255) NOT NULL,
    processDate DATETIME DEFAULT GETDATE()
);

CREATE TABLE YourTable (
    id INT IDENTITY(1,1) PRIMARY KEY,
    taskId INT NOT NULL,          -- Relación con processingStatus
    Nombre NVARCHAR(255) NULL,    -- Puede ser NULL si tiene error
    Edad INT NULL,                -- Puede ser NULL si tiene error
    Nums NVARCHAR(MAX) NULL,      -- Se almacena como JSON
    dateCreate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (taskId) REFERENCES processingStatus(id)
);
```

---

## 🚀 Instalación y Despliegue
1️⃣ **Clonar el repositorio**
```bash
git clone https://github.com/lpb21/KoibanxNodeAPI.git
cd koibanxback
```

2️⃣ **Instalar dependencias**
```bash
npm install
```

3️⃣ **Configurar variables de entorno (`.env`)**
```env
PORT=3000
DB_NAME=koibanxFile
DB_USER=sa
DB_PASSWORD=sa
DB_HOST=localhost
DB_DIALECT=mssql
DB_POOL_MAX=5
DB_POOL_MIN=0
DB_POOL_ACQUIRE=30000
DB_POOL_IDLE=20000
DB_CONNECT_TIMEOUT=60000
JWT_SECRET=M/uf3A8F6P+J7gGQZ1OqJ8D+hWvFQ5zjRQ==
JWT_EXPIRATION=1h
CORS_ORIGIN=http://localhost:5173
```

4️⃣ **Ejecutar la API**
```bash
npm run dev
```

✅ **Si todo está bien, verás:**
```
🚀 Servidor escuchando en el puerto 3000
✅ Conexión exitosa con MsSQL

```

---

## 🔑 Autenticación con JWT
1️⃣ **Para obtener un token, haz una petición POST al endpoint:**
URL: http://localhost:3000/v1/auth/token

✅ **Cuerpo de la petición (JSON):**
```json
{
  "user": "testUser"
}
```
✅ **Cabeceras necesarias:**
```json
{
  "Content-Type": "application/json"
}
```

✅ **Respuesta esperada:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsIn..."
}
```

---

## 📡 Endpoints de la API
### 📌 **1. Subir Archivo Excel**
**POST `/v1/upload`** _(Requiere autenticación)_
```json
Headers: {
    "Authorization": "Bearer TOKEN"
}
Body (form-data): {
    "file": (Archivo .xlsx)
}
```
✅ **Respuesta esperada:**
```json
{
    "message": "Archivo procesado con éxito",
    "taskId": 12345
}
```

### 📌 **2. Consultar Estado de una Tarea**
**GET `/v1/status/:taskId`** _(Requiere autenticación)_
```json
Headers: {
    "Authorization": "Bearer TOKEN"
}
```
✅ **Respuesta esperada:**
```json
{
    "status": "done",
    "data": [
        {
            "id": 1,
            "Nombre": "Esteban",
            "Edad": 30,
            "Nums": "[1,3,8,9,12,32,34,78,97,100]"
        }
    ]
}
```

### 📌 **3. Consultar Errores de una Tarea**
**GET `/v1/errors/:taskId`** _(Requiere autenticación)_
```json
Headers: {
    "Authorization": "Bearer TOKEN"
}
```
✅ **Respuesta esperada:**
```json
{
    "errors": [
        { "row": 2, "col": 1 },
        { "row": 2, "col": 2 },
        { "row": 2, "col": 3 }
    ]
}
```

---

## 📤 Ejemplo de Uso en Postman
📌 **1️⃣ Generar Token:**
- Método: `POST`
- URL: `http://localhost:3000/v1/auth/token`
- Body (JSON): `{ "user": "testUser" }`

📌 **2️⃣ Subir Archivo:**
- Método: `POST`
- URL: `http://localhost:3000/v1/upload`
- Headers: `{ "Authorization": "Bearer TOKEN" }`
- Body: `form-data` con campo `file` (Archivo .xlsx)

📌 **3️⃣ Consultar Estado:**
- Método: `GET`
- URL: `http://localhost:3000/v1/status/{taskId}`
- Headers: `{ "Authorization": "Bearer TOKEN" }`

📌 **4️⃣ Consultar Errores:**
- Método: `GET`
- URL: `http://localhost:3000/v1/errors/{taskId}`
- Headers: `{ "Authorization": "Bearer TOKEN" }`

---

## 🎥 Video Demostrativo
🎥 
Aquí puedes ver un video que muestra cómo funciona la API en acción:
[**📺 Ver Video Explicativo**](https://drive.google.com/file/d/1tQoo2z_QztJmjIq6L5XqcxWxIwVz6Ies/view?usp=sharing)


🚀 **¡Listo! Ahora puedes probar** 🎉


