const express = require("express")
const jwt = require("jsonwebtoken");
const {auth,authAdmin} = require("../middlewares/auth.js")
const userController = require("../controllers/user");

const router = express.Router();

router.get("/",authAdmin, userController.getAllUsers)
// router.get("/", userController.getAllUsers)
router.post("/", userController.addUser)
router.get("/myEmail", auth, userController.getEmailByToken)
router.get("/myInfo",auth, userController.getInfoByToken)
router.post("/login", userController.login)
router.put("/:id", userController.updateUser)
router.delete("/:id", userController.deleteUser)

module.exports = router;
