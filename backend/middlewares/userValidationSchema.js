const yup = require("yup")

const userValidationSchema = yup.object().shape({
    userName: yup
        .string("Username must be a string")
        .min(2, "Username is too short")
        .max(50, "Username is too long")
        .required("Username is required")
        .matches(/^[a-zA-Z0-9]+$/, "Username should not contain special characters"),
    email: yup
        .string("Email must be a string")
        .email("Invalid email")
        .required("Email is required"),
    password: yup
        .string("Password must be a string")
        .min(6, "Password is too short")
        .max(50, "Password is too long")
        .required("Password is required")
        .matches(/^[a-zA-Z0-9]+$/, "Password should not contain special characters")
})

module.exports = { userValidationSchema }