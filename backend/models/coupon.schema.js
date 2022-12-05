
import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {

    code:{
        type:String,
        required:[true, 'Please provide a coupon name']
    
    },

    discount:{
        type:Number,
        default:0
    },
    active:{
        type:Boolean,
        default:true
    },

  
    },
  {
    timestamp: true
  }
)

export default mongoose.model("Coupon", couponSchema);

