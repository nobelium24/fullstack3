const jsonwebtoken = require("jsonwebtoken")
const SECRET = "testRam"

const generateToken = (email) => {
    try {
        let token = jsonwebtoken.sign({email}, SECRET, {expiresIn:120} )
        return token
    } catch (error) {
        console.log(error)
        throw {
            name:"TokenGenerationError",
            message:"Error generating token"
        }
    }
}

const verifyToken = (token) => {
    try {
        if(!token) throw {name:"AuthenticationError", message:"Invalid token"}
        const decoded = jsonwebtoken.verify(token, SECRET)
        console.log(decoded)
        let email = decoded.email
        return email
    } catch (error) {
        console.log(error)
        throw {
            name:"TokenVerificationError",
            message:`Error verifying token`
        }
    }
}


module.exports = {generateToken, verifyToken}