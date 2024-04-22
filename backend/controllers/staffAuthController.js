const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

const Staff = require("../models/staff.model")


const { StatusCodes } = require('http-status-codes');
// const CustomError = require('../errors');


const staffLogin = async (req,res)=>{
    const{email,password} = req.body;
    await UserModel.findOne({email:email})
    .then(user=>{
      if(user){
        var userId = user.userId;
        bcrypt.compare(password,user.password, async (err,response)=>{
          if(response){
            const token = jwt.sign({email: user.email, role: user.role, type: user.userType, name:user.
                firstName},
              "jwt-secret-key",{expiresIn: '1d'});

              if(user.userType === "staff"){                                 //handle doctor
                const staff = await Staff.findOne({userId:userId});    // get user details using user id
                if(staff && staff.Status == "Active"){                   // set cookies and send data
                  res.cookie('token',token);
                  res.cookie('staffId',staff.staffId); 
                  res.cookie('staffName',staff.fName);  
                  res.cookie('staffRole',staff.JobRole);         // { httpOnly: true }
                  return res.json({Status:"Success", type:user.userType});
                }else{
                  return res.status(StatusCodes.NOT_FOUND).json("The staff is not active");
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

  // register controller




const verifystaff = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
      return res.json("Token is missing")
    }else{
      jwt.verify(token, "jwt-secret-key",(err,decode)=>{
        if(err){
          return res.json("error with token")
        }else{
          if(decode.type ==="staff"){
            next()
          }else{
            return res.json("not staff")
          }
        }
      })
    }
  }





const staffLogout = (req,res)=>{
    res.cookie('token','',{maxAge:1})
    res.cookie('staffId','',{maxAge:1})
    res.cookie('staffName','',{maxAge:1})
    res.cookie('staffRole','',{maxAge:1})
    return res.json("StaffLogout")
  }







  module.exports = {
    
    staffLogin,
    verifystaff,
    staffLogout,
  };