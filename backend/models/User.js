const mongoose = require('mongoose')

const UserSchema =  new mongoose.Schema({

    name: String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"patient"
    }

})

const UserModel = mongoose.model("users",UserSchema)
module.exports = UserModel