const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({origin:"*"}))



const uri = "mongodb+srv://nobelium24:oluwatobi@cluster0.1sfkfgv.mongodb.net/yetAnotherNodeClass?retryWrites=true&w=majority"

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, trim: true, unique: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true }
})

const userModel = mongoose.models.user_tbs || mongoose.model("user_tbs", userSchema)

app.post("/register", async (req, res) => {
    try {
        let { userName, email, password } = req.body
        const newUser = new userModel({
            userName,
            email, 
            password
        })

        const result = await newUser.save()
        console.log(result)
        return res.status(201).send({message:"Registration Successful", status: true})    
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:"Internal server error", status:false})
    }
})

const connect = async () => {
    try {
        mongoose.set("strictQuery", false)
        await mongoose.connect(uri)
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
    }
}
connect()

app.listen("5003", () => {
    console.log("Server started")
})