import User from '../models/user.model'
// import extend from "loadsh/extend"
import errorHandler from "../helpers/dbErrorHandler"


const create = async (req,res) => {
    const newUser = new User(req.body)
    try{
        await newUser.save()
        return res.status(200).json({
            message:"Successfully signed up!"
        })
    }catch(err){
        return res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}
const list = async (req,res) => {
    try{
        const foundUser = await User.find({}).select('name email updated created')
        res.status(200).json(foundUser)
    }catch(err) {
        return res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}

const userByID = async (req,res,next,id) => {
    try {
        let user = await user.findById(id)
        if(!user){
            return res.status(400).json({
                error:"User Not Found"
            })
        }
        req.profile = user
        next()
    }catch(err){
        return res.status(400).json({
            error:"Could not retrieve user"
        })
    }
}
const read = (req,res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

const update = async (req,res) => {
    try{
        let user = req.profile
        // let updatedUser = Object.create({},user,req.body)
        user = {...user,...req.body}
        user.updated = Date.now()
        await user.save()
        // await user.update({$set:{...req.body,updated:Date.now()}})
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    }catch(err){
        return res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async (req,res) => {
    try{
        let user = req.profile
        let deletedUser = await user.remove()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    }catch(err){
        return res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}


export default {create,userByID,read,list,remove,update}