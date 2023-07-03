const userRoutes = require("express").Router()
const {register, viewUsers} = require("../controllers/userController")

userRoutes.post("/register", register);
userRoutes.get("/viewUsers", viewUsers)

module.exports = userRoutes