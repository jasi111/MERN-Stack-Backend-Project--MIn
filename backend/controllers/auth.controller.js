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
res.status(200).json({
    success:true,
    token,
    user
})
})


/*
@LOGIN
@route htttp://localhost:4000/api/auth/login
@description User signIn controller for loging user
@parametersemai,password
@return User Object
*/
export const login = asyncHandler(async (req,res)=>{
    const {email,password}=req.body

    if (!emai|| !password){
        throw new CustomError ('Please fill all fields', 400)
    }

    User.findOne({email}).select("password")

    if(!user){
        throw new CustomError("Invvalid credentials",400)
    }

    const isPasswordMatched = await user.comparePassword(password)
   if (isPasswordMatched){const toekn = user.getJwtToken()
    user.password = undefined
res.cookie("token",token,cookieOptions)
return res.status(200).json({
    success:true,
    token,
    user
})
   }

   throw new CustomError('Invalid credentials -pass',400)
   
    // mongoose select 
})

/*
@LOGOUT
@route htttp://localhost:4000/api/auth/logout
@description User logout by clearing cookies
@parameters
@return success message
*/
export const logout = asyncHandler(async(_req,res) =>{
    //_req underscore is used means not using req
    //  or we can use 
    // res.clearCookie()
    res.cookie("token",null, {
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"Looged Out"
    })
})

/*
@FORGOUT 
@route htttp://localhost:4000/api/auth/logout
@description User logout by clearing cookies
@parameters
@return success message
*/