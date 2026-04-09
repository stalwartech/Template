const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
// Import the auth model here 
// const authModel = require()

const Login = async () => {
    const {email, password} = req.body
    try {
        // check if user exists in db
        // const UserExist = await          
    } catch (error) {
        
    }
    // If userExist is true, compare password, else throw invalid credentials
    // If password is true, create token, else throw invalid credentials
}

const SignUp = async ()=>{
    const {email, password, name} = req.body
    // check if user exists in db
    // If UserExist is true, throw error user already exists
    // If userExist is false, hash password then generate a token with the JWT 
    // Then save the email, hashedPassword, name and token in db and also put it in the req.header
}