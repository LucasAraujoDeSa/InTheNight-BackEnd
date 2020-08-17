const mongoose = require('../database/db');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const User = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        select:true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})

User.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash

    next()
})


module.exports = mongoose.model("user", User)