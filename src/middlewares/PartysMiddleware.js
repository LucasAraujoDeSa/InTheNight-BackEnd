const PartyModel =  require('../models/PartyModel');


const PartysMiddleware = async(req,res,next)=>{
    const {name,description,when,over} = req.body

    if(!name)
    return res.status(400).json({err: "name not informed"})
    else if(!description)
    return res.status(400).json({err: "description required"})
    else if(!when)
    return res.status(400).json({err: "please inform date"})
    else if(await PartyModel.findOne({name}))
    return res.status(400).json({err: "Party already exist"})
    else{
        next()
    }
    
}

module.exports = PartysMiddleware