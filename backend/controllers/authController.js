const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

// const { StatusCodes } = require('http-status-codes');
// const CustomError = require('../errors');


const login = async (req,res)=>{
    const{email,password} = req.body;
    await UserModel.findOne({email:email})
    .then(user=>{
      if(user){
        bcrypt.compare(password,user.password,(err,response)=>{
          if(response){
            const token = jwt.sign({email: user.email, role: user.role},
              "jwt-secret-key",{expiresIn: '1d'})
              res.cookie('token',token)
              return res.json({Status:"Success", role:user.role})
          }else{
            return res.json("The Password is incorrect")  // custom error
          }
  
        })
      }else {
        return res.json("No Records existed")    //put custom error
      }
  
    })
  
  }


// register controller
// const register = async (req, res) => {
  //     const {name, email, password} = req.body;
  //     bcrypt.hash(password, 10)
  //         .then(hash => {
  //             UserModel.create({name, email, password: hash})
  //                 .then(user => res.status(201).json({status: "ok"},res.json("Success")))
  //                 .catch(err => res.status(400).json(err));
  //         }).catch(err => res.status(400).json(err));
  // }


const verifypatient = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
      return res.json("Token is missing")
    }else{
      jwt.verify(token, "jwt-secret-key",(err,decode)=>{
        if(err){
          return res.json("error with token")
        }else{
          if(decode.role ==="patient"){
            next()
          }else{
            return res.json("not patient")
  
          }
        }
      })
    }
  }


const verifydoctor = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
      return res.json("Token is missing")
    }else{
      jwt.verify(token, "jwt-secret-key",(err,decode)=>{
        if(err){
          return res.json("error with token")
        }else{
          if(decode.role ==="doctor"){
            next()
          }else{
            return res.json("not doctor")
  
          }
        }
      })
    }
}


const logout = (req,res)=>{
    res.cookie('token','',{maxAge:1})
    return res.json("Logout")
  }







  module.exports = {
    // register,
    login,
    verifypatient,
    verifydoctor,
    logout,
  };