const express= require("express");
const router = express.Router();
const {auth,authAdmin} = require("../middlewares/auth.js")
const messageController = require("../controllers/message.js");


// router.get("/" , messageController.getAllMessages)
router.get("/" ,authAdmin, messageController.getAllMessages)
router.get("/sent" ,auth, messageController.getSentMessageByToken)
router.get("/sent/single/:id" ,auth, messageController.getSingelSentMessageByToken)
router.get("/inbox" ,auth, messageController.getReceivedMessagesByToken)
router.get("/inbox/:idFrom" ,auth, messageController.getMessagesFromByToken)
router.get("/sent/search",auth,messageController.SentMessageSearch)
router.get("/inbox/search",auth,messageController.ReceivedMessagesSearch)                         
router.post("/",auth, messageController.addMessage)
router.put("/:idEdit", auth,messageController.updateMessage)
router.delete("/:idDel",auth, messageController.deleteMessage)

module.exports = router;