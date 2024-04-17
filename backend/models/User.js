const mongoose = require('mongoose')

const UserSchema =  new mongoose.Schema({

    userId: String,
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