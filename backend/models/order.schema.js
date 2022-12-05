
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    product: {
     type:[
        {
            productId:{
        // it is for storing underscores id (_id)
                type:mongoose.Schema.Types.ObjectId,
                
                ref:"Product",
                reqired:true
            },
            count:Number,
            price:Number
        }
     ],
     required:true
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    coupn: String,
    transactionId:String,
    status:{
        type:String,
        enum:["ORDERED","SHIPPED","DELIVERED","CANCELLED"],
        default:"ORDERED"

        // assignment - improve this
    },

    // paymentMode:UPI, creditcard or wallet , COD
        
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);