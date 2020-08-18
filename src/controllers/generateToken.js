const authConfig = require('../config/auth.json')
const jwt = require('jsonwebtoken')
function generateToken(params={}){
    return jwt.sign(params, authConfig.secret,{
        expiresIn: 8000
    })
}

module.exports = generateToken