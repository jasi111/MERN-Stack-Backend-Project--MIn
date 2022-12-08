import User from "../models/user.schema.js"
import JWT from "jsonwebtoken"
import asyncHandler from "../services/async.Handler"
import CustomErro from "../utils/customEror"
import config from "../config/index"
import CustomError from "../utils/customError.js"

export const isLoggedIn = asyncHandler(async(req, _res,next) =>{
    // _res (_underscore) is used because res is not used
    let token;

    if(
        req.cookies.token ||
        (req.headers.authorization && req.headers.authorization.
            startsWith("Bearer")
            )

    )
    {
        token =req.cookie.token || req.headers.authorization.
        split(" ")[1]
    }

    if(!token){
        throw new CustomError('Not authorized to access this route', 401)
    }

    try{

        const decodedjwtPayload = JWT.verify(token,config.JWT_SECRET)
        // _id, find user based on id, set this in req.user
       req.user = await User.findById(decodedjwtPayload._id, "name email role")
    //    populating name email role based on _id
    // in this syntax instead comma using space to seperate
       next()
    }catch (error){
        throw new CustomError ("NOT authorized to access this route",401)
    }
})