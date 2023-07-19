const userRoutes = require("express").Router()
const { register, viewUsers, login, uploadImage } = require("../controllers/userController");
const { userValidationSchema } = require("../middlewares/userValidationSchema");
const { validate } = require("../middlewares/validator");

userRoutes.post("/register", validate(userValidationSchema), register);
userRoutes.get("/viewUsers", viewUsers);
userRoutes.post("/login", login)
userRoutes.post("/uploadimage", uploadImage)

module.exports = userRoutes