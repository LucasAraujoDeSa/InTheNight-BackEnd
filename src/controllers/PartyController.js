const PartyModel = require('../models/PartyModel');
const current = new Date()

const{startOfDay, endOfDay
    ,startOfWeek,endOfWeek
    ,startOfMonth,endOfMonth
    ,startOfYear,endOfYear} = require('date-fns')

class PartyController{
    async create(req,res){
        try{
            const party = new PartyModel(req.body)
            await party.save()
            return res.status(201).json({response:"create success"})
        }catch(error){
            console.log(err)
            return res.status(500).json({err :"erro ao criar party"})
        }
    }

    async all(req,res){
        try{
            const all = await PartyModel.find().sort('when')
            return res.status(200).json({response: all})
        }catch(err){
            console.log(err)
            return res.status(500).json({err: "impossible list partys"})
        }
    }

    async delete(req,res){
        try{
            await PartyModel.deleteOne({'_id':req.params.id})
            return res.status(200).json({response: "deleted with success"})
        }catch(err){
            console.log(err)
            return res.status(500).json({err: "err delete party"})
        }
    }

    async update(req,res){
        try{
            await PartyModel.findByIdAndUpdate({'_id':req.params.id},req.body,{new: true})
            return res.status(200).json({response: "update success"})
        }catch(err){
            res.status(500).json({err: "err update"})
        }
    }

    async today(req,res){
        try{
            const today = await PartyModel.find({'when':{'$gte':startOfDay(current),'$lt':endOfDay(current)}}).sort('when')
            return res.status(200).json({today})
        }catch(err){
            return res.status(400).json({err})
        }
    }
    async week(req,res){
        try{
            const week  = await PartyModel.find({'when':{'$gte':startOfWeek(current),'$lt':endOfWeek(current)}}).sort('when')
            return res.status(200).json({week})
        }catch(err){
            return res.status(400).json({err})
        }
    }
    async month(req,res){
        try{
            const month = await PartyModel.find({'when':{'$gte':startOfMonth(current),'$lt':endOfMonth(current)}}).sort('when')
            return res.status(200).json({month})
        }catch(err){
            return res.status(400).json({err})
        }
    }
    async year(req,res){
        try{
            const year = await PartyModel.find({'when':{'$gte':startOfYear(current),'$lt':endOfYear(current)}}).sort('when')
            return res.status(200).json({year})
        }catch(err){
            console.log(err)
            return res.status(400).json({err})
        }
    }
}

module.exports = new PartyController()