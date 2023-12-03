
const mongoose = require("mongoose");
const Joi = require("joi");

const messageSchema = new mongoose.Schema({
   title:String,
  body:String,
   link:String,
  from:{
    type:mongoose.Schema.ObjectId,
    ref:"users",
  }
    ,
  to:[mongoose.Schema.ObjectId],
  date_created:{
    type:Date, default:Date.now()
  },
 isRead:{type:Boolean,default:false}
})

exports.MessageModel = mongoose.model("messages",messageSchema);
 
exports.validateMessage = (_reqBody) => {
  let schemaJoi = Joi.object({
    title:Joi.string().min(2).max(99).required(),
    body:Joi.string().min(2).max(300).required(),
    link:Joi.string().min(2).max(300).allow(),
    to:Joi.allow()
  })
  return schemaJoi.validate(_reqBody)
}
