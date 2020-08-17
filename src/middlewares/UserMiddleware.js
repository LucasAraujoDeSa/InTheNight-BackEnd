const UserModel = require('../models/UserModel')

const UserMiddleware = async(req,res,next)=>{
    const{name,email,password} = req.body
    const isEmail = /\w+@\w+.\w+/

    if(!name)
    return res.status(400).json({err:"name not informed"})
    else if(!email)
    return res.status(400).json({err: "email not informed"})
    else if(!isEmail.test(email))
    return res.status(400).json({err: "invalid email format"})
    else if(await UserModel.findOne({email}))
    return res.status(400).json({err: "email already exist"})
    else{
        next()
    }
}

module.exports = UserMiddleware