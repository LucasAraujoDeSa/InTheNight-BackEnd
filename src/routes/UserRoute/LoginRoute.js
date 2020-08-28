const express = require('express')
const router = express.Router()



//controllers
    const AuthController = require('../../controllers/AuthController')

router.post("/authenticate",AuthController.authenticate)

router.post('/forgot_password',AuthController.forgot)

router.post('/reset_password',AuthController.reset)

module.exports = router



