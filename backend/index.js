const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const userRoutes = require("./routes/userRoute")

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: "*" }))
app.use("/users", userRoutes)



const uri = "mongodb+srv://nobelium24:oluwatobi@cluster0.1sfkfgv.mongodb.net/yetAnotherNodeClass2?retryWrites=true&w=majority"





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