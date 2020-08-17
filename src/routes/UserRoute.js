const express = require('express');
const router = express.Router();

//controllers
    const UserController = require('../controllers/UserController');


router.post("/registry",UserController.create)
router.delete("/delete/:id",UserController.delete)
router.put("/update/:id",UserController.update)
router.get("/filter/all",UserController.all)

 
module.exports = router