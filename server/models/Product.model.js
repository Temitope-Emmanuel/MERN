import mongoose from "mongoose"


const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:"Name is required"
    },
    description:{
        type:String,
        trim:true
    },
    image:{
        data:Buffer,
        contentType:String
    },
    price:{
        type:Number,
        required:"Price is required"
    },
    category:{
        type:String
    },
    quantity:{
        type:Number,
        required:"Quantity is required"
    },
    shop:{
        type:mongoose.Schema.ObjectId,
        ref:"Shop"
    },
    updated:Date,
    created:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model("Product",ProductSchema)