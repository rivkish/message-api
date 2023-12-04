const {MessageModel,validateMessage} =require("../models/messageModel")

const getAllMessages = async(req,res)=> {
    let perPage = Math.min(req.query.perPage,20) || 10;
    let page = req.query.page || 1;
    let sort = req.query.sort || "_id";
    let reverse = req.query.reverse == "yes" ? -1 : 1;
  
    try{
      let data = await MessageModel
      .find({}).populate("from",{"email":1})
      .limit(perPage)
      .skip((page - 1)*perPage)
      .sort({[sort]:reverse})
      res.json(data);
    } 
    catch(err){
      console.log(err)
      res.status(500).json({msg:"err",err})
    }                      
}

const getSentMessageByToken = async(req,res)=> {
    let perPage = Math.min(req.query.perPage,20) || 10;
    let page = req.query.page || 1;
    let sort = req.query.sort || "_id";
    let reverse = req.query.reverse == "yes" ? -1 : 1;
    try{
      let data = await MessageModel
      .find({ from: req.tokenData._id }).populate("from",{"email":1})
      .limit(perPage)
      .skip((page - 1)*perPage)
      .sort({[sort]:reverse})
      res.json(data);
    } 
    catch(err){
      console.log(err)
      res.status(500).json({msg:"err",err})
    }                      
}
const getSingelSentMessageByToken = async(req,res)=> {
  let perPage = Math.min(req.query.perPage,20) || 10;
  let page = req.query.page || 1;
  let sort = req.query.sort || "_id";
  let reverse = req.query.reverse == "yes" ? -1 : 1;
  try{
    let data = await MessageModel
    .find({ from: req.tokenData._id ,_id:req.params.id}).populate("from",{"email":1})
    .limit(perPage)
    .skip((page - 1)*perPage)
    .sort({[sort]:reverse})
    res.json(data);
  } 
  catch(err){
    console.log(err)
    res.status(500).json({msg:"err",err})
  }                      
}

const getReceivedMessagesByToken = async(req,res)=> {
    let perPage = Math.min(req.query.perPage,20) || 10;
    let page = req.query.page || 1;
    let sort = req.query.sort || "_id";
    let reverse = req.query.reverse == "yes" ? -1 : 1;
    try{
      let data = await MessageModel
      .find({}).populate("from",{"email":1})
      .limit(perPage)
      .skip((page - 1)*perPage)
      .sort({[sort]:reverse})
  
      let data2=data.filter(item=> {
       let b= item.to.includes(req.tokenData._id)
       item.to=[]
       return b
      })   

      res.json(data2);
    } 
    catch(err){
      console.log(err)
      res.status(500).json({msg:"err",err})
    }                      
}
const ReceivedMessagesSearch =async(req,res) => {
  try{
    let queryS = req.query.s;
    let searchReg = new RegExp(queryS,"i")
    let data = await MessageModel.find({
      $or: [
        { title: searchReg },
            { body: searchReg },     
          ]
    }).populate("from",{"email":1})
    .limit(50)
    let data2=data.filter(item=> {
      let b= item.to.includes(req.tokenData._id)
      item.to=[]
      return b
     })   
     res.json(data2);
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg:"there error try again later",err})
  }
}
const getMessagesFromByToken = async(req,res)=> {
  let perPage = Math.min(req.query.perPage,20) || 10;
  let page = req.query.page || 1;
  let sort = req.query.sort || "_id";
  let reverse = req.query.reverse == "yes" ? -1 : 1;
  try{
    let idFrom=req.params.idFrom;
    let data = await MessageModel
    .find({from:idFrom}).populate("from",{"email":1})
    .limit(perPage)
    .skip((page - 1)*perPage)
    .sort({[sort]:reverse})

    let data2=data.filter(item=> {
     let b= item.to.includes(req.tokenData._id)
     item.to=[]
     return b
    })   

    res.json(data2);
  } 
  catch(err){
    console.log(err)
    res.status(500).json({msg:"err",err})
  }                      
}
const SentMessageSearch =async(req,res) => {
    try{
      let queryS = req.query.s;
      let searchReg = new RegExp(queryS,"i")
      let data = await MessageModel.find({
        $or: [
          { title: searchReg },
              { body: searchReg },     
            ]
        ,from:req.tokenData._id}).populate("from",{"email":1})
      .limit(50)
      res.json(data);
    }
    catch(err){
      console.log(err);
      res.status(500).json({msg:"there error try again later",err})
    }
}

                                   
const addMessage= async(req,res) => {
    let valdiateBody =  validateMessage(req.body);
    if(valdiateBody.error){
      return res.status(400).json(valdiateBody.error.details)
    }            
    try{
      let m = new MessageModel(req.body);
      m.from=req.tokenData._id;
      await m.save();
      res.status(201).json(m)
    }
    catch(err){
      console.log(err)
      res.status(500).json({msg:"err",err})
    }
  }
  
const updateMessage= async(req,res) => {
    let valdiateBody = validateMessage(req.body);
    if(valdiateBody.error){
      return res.status(400).json(valdiateBody.error.details)
    }
    try{
      let editId = req.params.idEdit
      if(req.tokenData.role == "admin"){
        data = await MessageModel.updateOne({_id:editId},req.body)
      }
      else{
         data = await MessageModel.updateOne({_id:editId,from:req.tokenData._id},req.body)
      }
    
  
      res.json(data.modifiedCount?"Update successfully":"You can't update");
      // res.json(data);
    }
    catch(err){
      console.log(err)
      res.status(500).json({msg:"err",err})
    }
  }
  
const deleteMessage = async(req,res) => {
    try{
      let delId = req.params.idDel
      if(req.tokenData.role == "admin"){
        data = await MessageModel.deleteOne({_id:delId})
      }
      else{
        data = await MessageModel.deleteOne({_id:delId,from:req.tokenData._id})
      }
      res.json(data.deletedCount?"Deleted successfully":"You can't delete");
    }
    catch(err){
      console.log(err)
      res.status(500).json({msg:"err",err})
    }
  }

  module.exports = {
    getAllMessages,
    getSentMessageByToken,
    getReceivedMessagesByToken,
    SentMessageSearch,
    ReceivedMessagesSearch,
    addMessage,
    updateMessage,
    deleteMessage,
    getMessagesFromByToken,
    getSingelSentMessageByToken
}