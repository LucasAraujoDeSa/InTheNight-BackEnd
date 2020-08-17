const express = require('express');
const app = express()
app.use(express.json())
const bodyParser = require('body-parser');

//config 
    //body-parser
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())



//Routes
    //Party
        const Party = require('./routes/PartyRoute');
        app.use('/partys',Party)
    //User
        const User = require('./routes/UserRoute');
        app.use('/user', User)


app.listen(8000,()=>{console.log('SERVER ON')})