const express = require('express');
const router = express.Router();

//controllers
    const UserController = require('../../controllers/UserController');
    const UserMiddleware = require('../../middlewares/UserMiddleware')

router.post("/registry",UserMiddleware,UserController.create)
router.delete("/delete/:id",UserController.delete)
router.put("/update/:id",UserMiddleware,UserController.update)
router.get("/filter/all",UserController.all)

 
module.exports = router