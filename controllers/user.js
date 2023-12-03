
const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken");
const { UserModel, validateUser, loginValid, createToken } = require("../models/userModel")

// admin 
const getAllUsers = async (req, res) => {
    try {
        let data = await UserModel.find({})
        res.json(data)
    }
    catch (err) {
        res.status(500).json({ msg: "err", err })
    }
}
// Everyone
const addUser= async (req, res) => {
    let validBody = validateUser(req.body)
    if (validBody.error) {
        return res.status(400).json(validBody.error.details)
    }
    try {
        let user = new UserModel(req.body)
        user.password = await bcrypt.hash(user.password, 10)
        await user.save()
        user.password = "********"
        res.status(201).json(user)
    }
    catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({ msg: "Email already in system try again", code: 11000 })
        }
        res.status(500).json({ msg: "err", err })
    }
}

const getEmailByToken= async (req, res) => {
    try {
        let user = await UserModel.findOne({ _id: req.tokenData._id }, { email: 1 })
         res.json(user)
    }
    catch (err) {
        res.status(500).json({ msg: "err", err })
    }
}


const login= async (req, res) => {
    let validLogin = loginValid(req.body)
    if (validLogin.error) {
        return res.status(400).json(validLogin.error.details)
    }
    try {
        let user = await UserModel.findOne({ email: req.body.email })

        if (!user) {
            return res.status(401).json({ msg: "No user found" })
        }
        let valisPass = await bcrypt.compare(req.body.password, user.password)
        
        if (!valisPass) {
            return res.status(403).json({ msg: "wrong password" })
        }
        
        let newToken = createToken(user._id,user.role);
        res.json({ token: newToken });
    }
    catch (err) {
        res.status(500).json({ msg: "err", err })
    }
}

const getInfoByToken= async (req, res) => {
    try {
        let user = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0})
         res.json(user)
    }
    catch (err) {
        res.status(500).json({ msg: "err", err })
    }
}

const updateUser= async (req, res) => {
    let validBody = validateUser(req.body)
    if (validBody.error) {
        return res.status(400).json(validBody.error.details)
    }
    try {
        let id = req.params.id
        req.body.password = await bcrypt.hash(user.password, 10)
        let data = await CountryModel.updateOne({ _id: id }, req.body)
        res.status(201).json(data)
    }
    catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({ msg: "Email already in system try again", code: 11000 })
        }
        res.status(500).json({ msg: "err", err })
    }
}

const deleteUser= async (req, res) => {
    try {
        let id = req.params.id
        let data = await UserModel.deleteOne({ _id: id })
        res.json(data)
    }
    catch (err) {
        res.status(500).json(err)
    }

}

module.exports = {
    getAllUsers,
    getEmailByToken,
    login,
    getInfoByToken,
    addUser,
    deleteUser,
    updateUser}