const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

const Doctor = require("../models/doctor.model")
const Patient = require("../models/Patient")

const { StatusCodes } = require('http-status-codes');
// const CustomError = require('../errors');


const login = async (req,res)=>{
    const{email,password} = req.body;
    await UserModel.findOne({email:email})
    .then(user=>{
      if(user){
        var userId = user.userId;
        bcrypt.compare(password,user.password, async (err,response)=>{
          if(response){
            const token = jwt.sign({email: user.email, role: user.role},
              "jwt-secret-key",{expiresIn: '1d'});

              if(user.role === "doctor"){                                 //handle doctor
                const doctor = await Doctor.findOne({userId:userId});    // get user details using user id
                if(doctor && doctor.status === true){                   // set cookies and send data
                  res.cookie('token',token);
                  res.cookie('roleId',doctor.doctorId);        // { httpOnly: true }
                  return res.json({Status:"Success", role:user.role});
                }else{
                  return res.status(StatusCodes.NOT_FOUND).json("The doctor is not active");
                }
              }
              else if(user.role === "patient"){                          //handle patient 
                const patient = await Patient.findOne({userId:userId});
                if(patient && patient.status === true){
                  res.cookie('token',token);
                  res.cookie('roleId',patient.patientId);
                  return res.json({Status:"Success", role:user.role})
                }else{
                  return res.status(StatusCodes.NOT_FOUND).json("The patient is not active")
                }
              }
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
    res.cookie('role','',{maxAge:1})
    res.cookie('user','',{maxAge:1})
    res.cookie('roleId','',{maxAge:1})
    return res.json("Logout")
  }







  module.exports = {
    // register,
    login,
    verifypatient,
    verifydoctor,
    logout,
  };