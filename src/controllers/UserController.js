const UserModel = require('../models/UserModel')
const generateToken = require('../controllers/generateToken')

class UserController{
    async create(req,res){
        try{
            const user = await UserModel.create(req.body)
            user.save()

            return res.status(200).json({response: 'user created',token:generateToken({id:user.id})})
        }catch(err){
            return res.status(400).json({err: "not created"})
        }
    }
    async all(req,res){
        try{
            const all = await UserModel.find().sort("createdAt")
            return res.status(200).json(all)
        }catch(err){
            return res.status(400).json({err})
        }        
    }
    async update(req,res){
        try{
            await UserModel.findOneAndUpdate({"_id":req.params.id},req.body,{new: true})
            return res.status(200).json({response: "update"})
        }catch(err){
            console.log(err)
            res.status(500).json({err})
        }
    }
    async delete(req,res){
        try{
            await UserModel.findByIdAndRemove({"_id":req.params.id})
            return res.status(200).json({response: "removed"})
        }catch(err){
            return res.status(400).json({err})
        }
    }
}

module.exports = new UserController()