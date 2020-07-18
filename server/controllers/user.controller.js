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
        .populate('following','_id name')
        .populate('followers','_id name').exec()

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
    console.log("reaching the read rout")
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

// Update the following array of the current user 
const addFollowing = async (req,res,next) => {
    try{
        await User.findByIdAndUpdate(req.body.userId,{
            // This User is followinig
            $push:{following:req.body.followId}}
            )
            next()
    }catch(err){
        return res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}
// remove another user from the current user reference 
const removeFollowing = async (req,res,next) => { 
    try{
        // The following array of the current user
        await User.findByIdAndUpdate(req.body.userId,{
            $pull:{following:req.body.unfollowId}
        })
        next()
    }catch(err){
        return res.statuc(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}

// This will add the current user to another user
//  follower array 
const addFollower = async (req,res) => {
    try{
        let result = await User.findByIdAndUpdate(req.body.followId,{
            // The other users followers array
            $push:{followers:req.body.userId}},
            {new:true})
            .populate('following',"_id name")
            .populate('followers','_id name')
            .exec()
            
            result.hashed_password = undefined
            result.salt = undefined
            res.json(result)
    }catch(err){
        return res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}
const removeFollower = async (req,res) => {
    try{
        let result = await User.findByIdAndUpdate(req.body.unfollowId,{
            $pull:{followers:req.body.userId}},
            {new:true})
            .populate('following','_id name')
            .populate('followers','_id name').exec()
        
            result.hashed_password = undefined
            result.salt = undefined
            return res.json(result)
    }catch(err){
        return res.status(400).json({
            error:errHandler.getErrorMessage(err)
        })
    }
}
const findPeople = async (req,res) => {
    let following = req.profile.following
    following.push(req.profile._id)
    try{
        let users = await User.find({_id:{$nin:following}}).select('name')
        return res.json(users)
    }catch(err){
        return res.status(400).json({
            error:errHandler.getErrorMessage(err)
        })
    }
}

export default {
    create,userByID,read,
    list,remove,update,
    photo,defaultPhoto,
    addFollower,addFollowing,
    removeFollower,removeFollowing,findPeople
}