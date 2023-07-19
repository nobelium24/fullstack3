const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const userRoutes = require("./routes/userRoute")
const {errorHandler} = require("./middlewares/errorHandler")
const app = express()
require("dotenv").config()
app.use(bodyParser.json({limit:"100mb"}))
app.use(bodyParser.urlencoded({ extended: true, limit:"100mb" }))
app.use(cors({ origin: "*" }))
app.use("/users", userRoutes)

app.use(errorHandler)



const uri = process.env.MONGO_URI





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