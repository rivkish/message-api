const mongoose=require("mongoose")
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const {config} =require("../config/secret.js")

let userSchema=new mongoose.Schema({
    name: {
        firstName: String,
        lastName: String
      },
 
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        minLength: 4,
        required: true
        // select: false,
      },
      birthDate: {
        type: Date,
        default: new Date("1900-01-01"),
      },
      role: {
        type: String,
        default: "user",
      },
    date_created:{
        type:Date,
        default:Date.now()
    },
})

exports.UserModel=mongoose.model("users",userSchema)

exports.validateUser=(_reqbody)=>{
    let joiSchema=Joi.object({
        name: {
            firstName: Joi.string().min(2).max(50).required(),
            lastName: Joi.string().min(2).max(50).required(),
        },
        email: Joi.string().min(2).max(100).email().required(),
        password: Joi.string().min(4).max(50).required(),
        birthDate: Joi.date().allow()
    })

    return joiSchema.validate(_reqbody)
}
exports.createToken=(_id,role)=>{
    let token=jwt.sign({_id,role},config.tokenSecret,{expiresIn:"60mins"})
    return token
  
  }

exports.loginValid=(_reqbody)=>{
    let joiSchema=Joi.object({
        email: Joi.string().min(2).max(100).email().required(),
        password: Joi.string().min(4).max(50).required(),
    })

    return joiSchema.validate(_reqbody)
}


