import User from "../models/user.model"
import config from "../../config/config"
import expressJwt from "express-jwt"
import jwt from 'jsonwebtoken'


const signin = async function(req,res){
    console.log("Reaching")
    try{
        let user = await User.findOne({"email":req.body.email})
        if(!user){
            return res.status(401).json({error:"User Not Found!!!"})
        }
        if(!user.authenticate(req.body.password)){
            return res.status(401).json({
                error:"Password don't match"
            })
        }
        const token = jwt.sign({_id:user._id},config.jwtSecret)
        res.cookie('t',token,{expire:new Date() + 9999})
        return res.status(200).json({
            token,
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                educator:user.educator
            }
        })
    }catch(err){
        return res.status(401).json({error:"Could not sign in"})
    }
}
const signout = function(req,res){
    console.log("Reaching")
    res.clearCookie("t")
    return res.status(200).json({
        message:"Signed out"
    })
}

const requireSignin = expressJwt({
    secret:config.jwtSecret,
    userProperty:'auth',
    algorithms:['HS256']
})

const hasAuthorization = function(req,res,next){
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
        if(!authorized){
            return res.status(403).json({
                error:"User is not authorized to perform this action"
            })
        }
        next()
}

export default {signin,signout,requireSignin,hasAuthorization}