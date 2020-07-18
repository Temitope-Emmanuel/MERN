import User from '../models/user.model'
import extend from "lodash/extend"
import errorHandler from "../helpers/dbErrorHandler"
import formidable from "formidable"
import fs from "fs"

import profileImage from "../../client/assets/images/profile-pic.png"


const photo = (req,res,next) => {
    if(req.profile.photo.data){
        res.set("Content-Type",req.profile.photo.contentType)
        return res.send(req.profile.photo.data)
    }
    next()
}
const defaultPhoto = (req,res) => {
    return res.sendFile(process.cwd()+profileImage)
}


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

const list = async (req, res) => {
    try {
      let users = await User.find().select('name email updated created')
    return res.status(200).json(users)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  }
  
const userByID = async (req,res,next,id) => {
    try {
        let user = await User.findById(id)
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

const update = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,async (err,fields,files) => {
        if(err){
            return res.status(400).json({
                error:"Photo could not be uploaded"
            })
        }
        let user = req.profile
        user = extend(user,fields)
        user.updated = Date.now()
        if(files.photo){
            user.photo.data = fs.readFileSync(files.photo.path)
            user.photo.contentType = files.photo.type
        }
        try{
            await user.save()
            user.hashed_password = undefined
            user.salt = undefined
            res.json(user)
        }catch(err){
            console.log("this is the error",err)
            return res.status(400).json({
                error:errorHandler.getErrorMessage(err)
            })
        }
    })
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


export default {
    create,userByID,read,
    list,remove,update,
    photo,defaultPhoto
}