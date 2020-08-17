const express = require('express');
const router = express.Router();

//controllers
    const PartyController = require('../controllers/PartyController')
//Middlewares
    const PartyMiddleware = require('../middlewares/PartysMiddleware')

router.post('/create',PartyMiddleware,PartyController.create)
router.delete('/delete/:id',PartyController.delete) 
router.put('/update/:id',PartyMiddleware,PartyController.update)
router.get('/filter/all',PartyController.all)
router.get('/filter/today',PartyController.today)
router.get('/filter/week',PartyController.week)
router.get('/filter/month',PartyController.month)
router.get('/filter/year',PartyController.year)     

module.exports = router