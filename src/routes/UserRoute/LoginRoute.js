const express = require('express')
const router = express.Router()

//controllers
    const AuthController = require('../../controllers/AuthController')

router.post("/authenticate",AuthController.authenticate)

module.exports = router



