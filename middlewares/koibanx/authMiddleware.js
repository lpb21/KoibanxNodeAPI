const jwt = require('jsonwebtoken');
const { Config } = require("../../src/config")

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado, token requerido' });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), Config.jwt_secret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido o expirado' });
    }
};

module.exports = authMiddleware;