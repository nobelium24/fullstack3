const userModel = require("../models/user.model")

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

module.exports = {register, viewUsers}