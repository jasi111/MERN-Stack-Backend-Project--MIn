import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import crypto from "crypto";
import config from "../config/index"


const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      maxLength: [50, "Name must be less than 50"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    // look for email regex and apply it in this code

    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [8, "password must be atleast than8 charactes"],
      select: false,
      // this select is for querying mongodb not for creating document - 
      // means no querying-is allowed for password thats why it we pept select:false
      // but the password is available in document but not able to do query
      // by making thi select flase this field will not come in datatbase field
      // so the password will be stored in.....by how?
    },

    role: {
      type: String,
      // enum:['ADMIN','USER']
      enum: Object.values(AuthRoles),
      default: AuthRoles.USER,
    },

    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },

  {
    timestamps: true,
    // timestamp in mongoose
  }
);

// Challenge 1- encrypt password - hooks
//Encrypt Password
//using mongoose hooks
// using next()
userSchema.pre("save", async function (next) {
  // if this is not midified
  if (!this.modifies("password")) return next();
  // encrypt password before sending to DB
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//add more features directly to your schema
// mongoose schema mehods
userSchema.method = {

    // compare password
    comparePassword:async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
},

// genereate JWT TOKEN
getJwtToken: function(){
    return JWT.sign(
        {
        _id:this._id,
        role:this.role,

    },
    // 'bad-secret',
    config.JWT_SECRET,
    {
        expiresIn:config.JWT_EXPIRY
    }
    )
    // payload, privatekey and the otions
    // payload is the _id
},

gernerateForgotPasswordToken: function(){
const forgotPasswordToken = crypto.randomBytes(20).toString ('hex');

// step 1 - save to DB
this.forgotPasswordToken = crypto
.createHash("sha256")
.update(forgotToken)
.digest("hex")

this.forgotPasswordExpiry =Date.now() + 20 * 60 * 1000// step 2-return values to user

//step 1 -
return forgotToken
}
}

export default mongoose.model("User", userSchema);
