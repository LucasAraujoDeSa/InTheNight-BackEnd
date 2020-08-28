const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')
const generateToken = require('../controllers/generateToken')
const crypto = require('crypto')
const mailer = require('../modules/maile')

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

    async forgot(req,res){
        const{email} = req.body
        try{
            const user = await UserModel.findOne({email})

            if(!user)
                return res.status(400).json({err: "User not Found"})
            
            const token = crypto.randomBytes(20).toString('hex') 

            const now = new Date()
            now.setHours(now.getHours()+1)

            await UserModel.findByIdAndUpdate(user.id, {
                '$set':{
                    passwordResetToken: token,
                    passwordResetExpires: now
                }
            })
            
            mailer.sendMail({
                to: email, 
                from: 'teste2@email.com',
                template: "auth/forgot",
                context: {token}
            },(err)=>{
                if(err){
                    console.log(err)
                    return res.status(400).json({err:"erro"})
                }
                    
                
                return res.status(200).json({response:"ok"})
            })
        }catch(err){
            console.log(err)
        }
    }

    async reset(req,res){
        try{
            const {email, password, token} = req.body
            const user = await UserModel.findOne({email})
                .select('+passwordResetToken passwordResetExpires')
            
                if(!user)
                    return res.status(400).json({err: "User not found"})
                
                if(token !== user.passwordResetToken)
                    return res.status(400).json({err: "Token invalid"})
                    
                const now = new Date();
                
                if(now > user.passwordResetExpires)
                    return res.status(400).json({err: "token expired"})
                
                user.password = password

                await user.save()

                res.json({response:'sucess'})
        }catch(err){
            console.log(err)
            res.status(400).json({error:'Cannot reset password, try again'})
        }
    }
}


module.exports = new AuthController()