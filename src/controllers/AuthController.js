const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')
const generateToken = require('../controllers/generateToken')

class AuthController{
    async authenticate(req,res){
        const{email, password} = req.body

        const user = await UserModel.findOne({email}).select('+password')

        if(!user)
        return res.status(400).json({err: "user not exist"})

        if(! await bcrypt.compare(password, user.password))
        return res.status(400).json({err: "Invalid Password"})

        user.password = undefined;

        

        res.json({user, token:generateToken({id:user.id})});
    }
}


module.exports = new AuthController()