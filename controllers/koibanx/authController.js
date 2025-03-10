const jwt = require('jsonwebtoken');
const { Config } = require("../../src/config")

const generateToken = (req, res) => {
    const { user } = req.body;

    if (!user) {
        return res.status(400).json({ error: 'Usuario requerido' });
    }

    const token = jwt.sign({ user }, Config.jwt_secret, { expiresIn: Config.jwt_expiration });

    res.json({ token });
};

module.exports = { generateToken };
