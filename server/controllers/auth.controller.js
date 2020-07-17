import User from "../models/user.model"
import config from "../../config/config"
import expressJwt from "express-jwt"
import jsonwebtoken from 'jsonwebtoken'


const signin = function(req,res){}
const signout = function(req,res){}
const requireSigin = function(req,res,next){}
const hasAuthorization = function(req,res,next){}

export default {signin,signout,requireSigin,hasAuthorizationx}