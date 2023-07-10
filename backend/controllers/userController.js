const userModel = require("../models/user.model")
const bcryptJs = require("bcryptjs")

const register = async (req, res) => {
    try {
        let { userName, email, password } = req.body
        const newUser = new userModel({
            userName,
            email,
            password
        })

        const result = await newUser.save()
        console.log(result)
        return res.status(201).send({ message: "Registration Successful", status: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Internal server error", status: false })
    }
}

const viewUsers = async (req, res) => {
    try {
        const users = await userModel.find({}, {userName: 1, email: 1})
        console.log(users)
        res.status(200).send(users)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Internal server error", status: false })
    }
}

const login = async (req, res)=>{
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
        return res.status(200).send({message:`Welcome, ${user.userName}`, status:true})
    }catch(error){
        console.log(error)
    }
}

module.exports = {register, viewUsers, login}