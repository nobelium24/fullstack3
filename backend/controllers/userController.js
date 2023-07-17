const userModel = require("../models/user.model")
const bcryptJs = require("bcryptjs")
const { generateToken, verifyToken } = require("../services/sessions")
const {sendMessage} = require("../utilities/mailer")


const register = async (req, res, next) => {
    try {
        let { userName, email, password } = req.body
        const newUser = new userModel({
            userName,
            email,
            password
        })

        const result = await newUser.save()
        console.log(result)
        sendMessage(email)
        return res.status(201).send({ message: "Registration Successful", status: true })
    } catch (error) {
        next(error)
    }
}

const viewUsers = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const email = verifyToken(token)
        const user = userModel.findOne({email:email})
        if(!user) return res.status(404).send({message:"User not found", status: false})
        const users = await userModel.find({}, {userName: 1, email: 1})
        console.log(users)
        return res.status(200).send(users)
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next)=>{
    try{
        const {email, password} = req.body
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({message:"You do not have an account with us", status:false})
        }
        const isMatch = await bcryptJs.compare(password, user.password)
        console.log(isMatch)
        if(!isMatch){
            return res.status(401).send({message:"Invalid password", status:false})
        }
        const token = generateToken(email)
        return res.status(200).send({message:`Welcome, ${user.userName}`, status:true, token})
    }catch(error){
        next(error)
    }
}

module.exports = {register, viewUsers, login}