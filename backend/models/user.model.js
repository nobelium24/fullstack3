const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, trim: true, unique: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true }
})

const userModel = mongoose.models.user_tbs || mongoose.model("user_tbs", userSchema)

module.exports = userModel