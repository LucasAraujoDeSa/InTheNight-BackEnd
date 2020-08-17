const mongoose = require('../database/db')
const Schema = mongoose.Schema

const Party = new Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type: String,
        require:false
    },
    price:{
        type:Number,
        require:true,
        default: 0
    },
    when:{
        type:Date,
        require: true
    },
    image:{
        type:String,
        require: false
    },
    over:{
        type:Boolean,
        require: false,
        default: 0

    }
});

let party = mongoose.model('Party', Party);
module.exports = party