import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please provide a product name"],
        trim:true,
        maxLength:[120, "Product name should be a max of 120 chracters"]
    },
    price:{
        type:Number,
        required:[true,"please provide a product price"],
        maxLength:[5, "product price should not be more than 5 digits"]

    },
    description:{
        type:String,
        //use some form of editor - personal assignment
    },
    // images can be pushed to etither firebase,cloudinary, aws
    photos:[
        {
            secure_url:{
                type:String,
                required:true
            }
        }
    ],

    stock:{
        type:Number,
        default:0
    },
    sold:{
        type:Number,
        default:0
    },

    collectionId:{
        // it is for storing underscores id (_id)
        type:mongoose.Schema.Types.ObjectId,
        ref:"Collection"
    }
        
    },
    {
        timestamps:true
    
})
export default mongoose.model("Product", productSchema)