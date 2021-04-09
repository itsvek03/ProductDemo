const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })

// HashPassword
exports.hashPassword = (password) => bcrypt.hash(password, 10)

// ComparePassword
exports.comparePassword = (password, hash) => bcrypt.compareSync(password, hash)


// Create Token
exports.createToken = ({ id, email }) => {
    const token = jwt.sign({ id, email }, process.env.JWT_SECRETKEY, { expiresIn: '24h' })
    const refreshToken = jwt.sign({ id, email }, process.env.JWT_REFERESHKEY, { expiresIn: '30d' })
    return { token, refreshToken };
}

// Verify the user
exports.verifyToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY, { expiresIn: '24h' })
    return decoded;
}