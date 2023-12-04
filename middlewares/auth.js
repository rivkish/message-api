const jwt = require("jsonwebtoken");
const {config} =require("../config/secret.js")


exports.auth=async(req,res,next)=>{
    let token=req.header("x-api-key");
    if(!token){
        return res.status(401).json({msg:"You need to send a token"})
    }
    try{
        let tokenData=jwt.verify(token,config.tokenSecret)
        req.tokenData=tokenData
        next()
    }
    catch(err){
        return res.status(500).json({msg:"Token not valid"})
    }
}

exports.authAdmin=async(req,res,next)=>{

    let token=req.header("x-api-key");
    if(!token){
        return res.status(401).json({msg:"You need to send a token"})
    }
    try{
        let tokenData=jwt.verify(token,config.tokenSecret)
        console.log(tokenData)
        if(tokenData.role != "admin"){
            return res.status(401).json({msg:"Unauthorized token You need an administrator token"})
          }
        req.tokenData=tokenData
        next()
    }
    catch(err){
        return res.status(500).json({msg:"Token not valid"})
    }
}