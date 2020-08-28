const express = require('express');
const app = express()
const cors = require('cors')
app.use(express.json())
const bodyParser = require('body-parser');
app.use(cors())

//config 
    //body-parser
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())



//Routes
    //Party
        const Party = require('./routes/AdminRoute/PartyRoute');
        app.use('/partys',Party)
    //User
        const User = require('./routes/UserRoute/RegistryRoute');
        const Login = require('./routes/UserRoute/LoginRoute')
        app.use('/user', User)
        app.use('/auth',Login)
    //Teste
        const teste = require('./routes/project')
        app.use('/teste',teste)


app.listen(8000,()=>{console.log('SERVER ON')})