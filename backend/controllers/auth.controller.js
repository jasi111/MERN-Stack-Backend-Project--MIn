import User from "../models/user.schema.js"
import asyncHandler from "../services/asyncHandler"
import CustomError from "../utils/customError"

export const cookieOptions ={
    expires:new Date(Date.now() +3 * 24 * 60 * 60 * 1000),
    httpOnly:true,

    // could be in a seperate file in utils
}

/*
@SIGNUP
@route htttp://localhost:4000/api/auth/signup
@description User signup controller for creating a new user
@parameters name,emai,password
@return User Object
*/
export const signUp = asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body

    if (!name|| !email || !password){
        throw new CustomError ('Please fill all fields', 400)
    }
// check if user exists
const existingUser = await User.findOne({email})
if (existingUser){
    throw new CustomError('User already exists',400)

}

const user = await User.create({
    name,
    email,
    password
// password is secured in user schema
});

const token = user.getJwtToken()
// call this function as (), if didnt called () then the return value for token will be received
console.log(user)
user.password = undefined
//while returning back we are making password undefined
// making the password undefined so that the user cannot see the password

res.cookie("token",token,cookieOptions)
res.status(200).json{
    success:true,
    token,
    user
}
})