const xlsx = require('xlsx');
const fs = require('fs');
const readXlsxFile = require('read-excel-file/node');

const validateRow = (row, rowIndex, format) => {
    const errors = [];

    // 📌 Mapeo de columnas (asumiendo que Excel tiene columnas: Nombre, Edad, Nums)
    const nombre = row.Nombre; // Primera columna
    const edad = row.Edad;   // Segunda columna
    const nums = row.Nums;   // Tercera columna
    
    // Validar Nombre (debe ser String)
    if (!nombre || typeof nombre !== 'string') {
        errors.push({ row: rowIndex, col: 1 });
    }

    // Validar Edad (debe ser Number)
    if (!edad || isNaN(edad)) {
        errors.push({ row: rowIndex, col: 2 });
    }

    let numsArray = null;
    // Validar Nums (debe ser un string de números separados por comas)
    if (format === "full") {
        if (!nums || nums === "" || nums === null) {
            
            errors.push({ row: rowIndex, col: 3 });
        } else {
            numsArray = nums.split(',')
                .map(num => num.trim())
                .filter(num => num !== '') // Eliminar elementos vacíos
                .map(Number)
                .filter(num => !isNaN(num)) // Filtrar valores no numéricos
                .sort((a, b) => a - b); // Ordenar de menor a mayor

            if (numsArray.length === 0) {
                errors.push({ row: rowIndex, col: 3 });
            } 
        }
    }

    return { errors, numsArray };
};
const parseExcel = async (filePath, format) => {
try {
    const validData = [];
    const errors = [];

    const rows = await readXlsxFile(fs.createReadStream(filePath)); 
    console.log(106,"📂 📊 Datos Leídos del Excel (Raw Data):", rows);

    // 📌 Extraer encabezados para construir objetos
    const headers = rows[0]; // 📌 La primera fila son los nombres de las columnas
    console.log(110,"📌 Encabezados detectados:", headers);

    for (let index = 1; index < rows.length; index++) {
        const rowArray = rows[index];
        const row = headers.reduce((obj, key, i) => {
            obj[key] = rowArray[i] !== undefined ? rowArray[i] : null;
            return obj;
        }, {});
        console.log(121,`📌 Fila ${index} antes de validar:`, row); // 🔍 Imprimir cada fila antes de validar
        const { errors: rowErrors, numsArray } = validateRow(row, index, format);
        
        if (rowErrors.length > 0) {
            errors.push(...rowErrors);
        } else {
            validData.push({
                Nombre: row.Nombre,
                Edad: Number(row.Edad),
                Nums: numsArray ? JSON.stringify(numsArray) : null
            });
            console.log(132,`✅ Fila ${index} validada correctamente:`, validData[validData.length - 1]);
        }
    }
    return { validData, errors };
} catch (error) {
    console.error('❌ Error en `parseExcel`:', error);
    throw new Error('Error procesando el archivo Excel');
}
};

module.exports = { parseExcel };