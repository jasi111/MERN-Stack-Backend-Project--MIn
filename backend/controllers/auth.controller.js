import User from "../models/user.schema.js"
import asyncHandler from "../services/asyncHandler"
import CustomError from "../utils/customError"
import mailHelper from "../utils/mailHelper"
import crypto from "crypto"

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

    const user = await User.findOne({email}).select("+password")

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
@FORGOT 
@route htttp://localhost:4000/api/auth/password/forgot
@description User will submit email and we will geberate a token
@parameters - email
@return - success message "email sent"
*/
export const forgotPassword = asyncHandler(async(req,res) => {
    const {email} = req.body
   const user = await User.findOne({email})
//assignment - check input - email null or email validation
   if (!user){
    throw new CustomeError("User not found",404)
   }
   const resetToken = user.generateForgotPasswordToken()

   await user.save({validateBeforeSave:false})
   const resetUrl = `${req.protocol}://${req.get("host")}/api/auth/password/reset/${resetToken}`
 const text = `Your password rest url is 
 \n\n ${resetUrl}\n\n`
  try {
    await mailHelper({
        email:user.email,
        subject:"Password reset email for website",
        text:text,
    })
    res.status(200).json({
        succes:true,
        message:"Email send to ${user.email}"
    })
  } catch (error) {
    //roll back - clear fields and save
    user.forgotPasswordToken = undefined
    user.forgotPasswordExpiry = undefined

    await user.save({validateBeforeSave:false})
    throw new CustomError(err.message || "Email sent failer",500)
  }
})

/*
@RESET PASSWORD
@route htttp://localhost:4000/api/auth/password/reset/:resetPasswordToken
@description User will be able to reset paswsword based on url token
@parameters - token from url, password and confirmpass
@return - User Object
*/

export const resetPassword = asynHandler(async(re,res)=>{

    const {token:resetToken} = req.params
    const {password, confirmPassword} = req.body

   const resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

    // User.findOne({email:email)}
    const user = await User.findOne({
        forgotPasswordToken:resetPasswordToken,
        forgotPasswordExpiry:{$gt: Date.now()}
        //$gt: Date.now means date graeter than now date
        });

        if (!user){
            throw new CustomError('password token is invalid or expired',400)
        }

        if (password !== confirmPassword){
            throw new CustomError('password and conf password dowsnot not match',400)
                    }
                    user.password=password
                    user.forgotPasswordToken = undefined
                    user.forgotPasswordExpiry = undefined

                    await user.save()

                    //create token and send as response
                    const token = user.getJwtToken()
                    user.password = undefined

                    //helper method for cookie  can be added
                    res.cookie("token", token , cookieOptions)
                    res.status(200).json({
                        success:true,
                        user
                    })
})

// Asssignment - Create a controller for change password


/*
@GET_PROFILE 
@REQUEST_TYPE GET
@route htttp://localhost:4000/api/auth/profile
@description check for token and populate req.user
@parameters 
@return - User Object
*/

export const getProfile = asyncHandler(async (re,res)=>{
    const {user} =req
    if(!user) {
        throw new CustomError("User not found", 404)
    
    }
    res.status(200).json({
        suucess:true,
        user
    })
})