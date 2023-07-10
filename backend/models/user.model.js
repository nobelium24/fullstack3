const mongoose = require("mongoose")
const bcrypytJs = require("bcryptjs")

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, trim: true, unique: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true }
})

let saltRound = 10
userSchema.pre("save", function (next) {
    if (this.password != undefined) {
        bcrypytJs.hash(this.password, saltRound).then((hashed)=>{
            this.password = hashed
            next()
        }).catch((error)=>{
            console.log(error)
        })
    }
})

const userModel = mongoose.models.user_tbs || mongoose.model("user_tbs", userSchema)

module.exports = userModel