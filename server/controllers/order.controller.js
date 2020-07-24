import errHandler from "../helpers/dbErrorHandler"
import Order from "../models/order.model"


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
        let order = await order.find(
            {"products.shop":req.shop._id}).populate(
                {path:'products.product',select:'_id name price'})
                .sort("-created").exec()
    }catch(err){
        return res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}


export default {create,listByShop}