import errHandler from "../helpers/dbErrorHandler"
import {Order,CartItem} from "../models/order.model"


const create = async (req,res) => {
    try{
        req.body.order.user = req.profile
        let order = new Order(req.body.order)
        let result = await order.save()
        res.status(200).json(result)
    }catch(err){
        return res.status(400).json({
            error:errHandler.getErrorMessage(err)
        })
    }
}
const listByShop = async (req,res) => {
    try{
        let order = await Order.find(
            {"products.shop":req.shop._id}).populate(
                {path:'products.product',select:'_id name price'})
                .sort("-created").exec()
            res.json(order)
    }catch(err){
        return res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}
const getStatusValues = async (req,res) => {
    console.log(CartItem.schema.path("status"))
    res.json(CartItem.schema.path('status').enumValues)
}
const update = async (req,res) => {
    console.log("Reaching the order route")
    try{
        let order = await Order.updateOne(
            {'products._id':req.body.cartItemId},{
                "$set":{
                    'products.$.status':req.body.status
                }
            })
        res.json(order)
    }catch(err){
        console.log("there's been an error",err)
        return res.status(400).json({
            error:errHandler.getErrorMessage(err)
        })
    }
}
const orderByID = async (req,res,next,id) => {
    console.log("reaching the order route")
    try{
        let order = await Order.findById(id)
                .populate('products.product','name price')
                .populate('products.shop','name').exec()
        if(!order){
            return res.status(400).json({
                error:"Order Not Founnd"
            })
        }
        req.order = order
        next()
    }catch(err){
        console.log("there's been an err",err)
        return res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}


export default {
    create,listByShop,getStatusValues,
    update,orderByID}