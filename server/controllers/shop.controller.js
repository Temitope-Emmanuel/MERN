import Shop from '../models/shop.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'
import defaultImage from './../../client/assets/images/default.png'

const create = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(400).json({
        message: "Image could not be uploaded"
      })
    }
    let shop = new Shop(fields)
    shop.owner= req.profile
    if(files.image){
      shop.image.data = fs.readFileSync(files.image.path)
      shop.image.contentType = files.image.type
    }
    try {
      let result = await shop.save()
      console.log("we are here successful")
      res.status(200).json(result)
    }catch (err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

// Listing  all available shops
const list = async (req, res) => {
    try {
      let shops = await Shop.find()
      res.json(shops)
    } catch (err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
}

const shopByID = async (req, res, next, id) => {
    try {
      let shop = await Shop.findById(id).populate('owner', '_id name').exec()
      if (!shop)
        return res.status('400').json({
          error: "Shop not found"
        })
      req.shop = shop
      next()
    } catch (err) {
      return res.status('400').json({
        error: "Could not retrieve shop"
      })
    }
  }
  

const photo = (req, res, next) => {
    if(req.shop.image.data){
      res.set("Content-Type", req.shop.image.contentType)
      return res.send(req.shop.image.data)
    }
    next()
  }
  const defaultPhoto = (req, res) => {
    return res.sendFile(process.cwd()+defaultImage)
}

// For Find shops created by a particular user
const listByOwner = async (req, res) => {
    try {
    let shops = await Shop.find({owner:
    req.profile._id}).populate('owner', '_id name')
    res.json(shops)
    } catch (err){
    return res.status(400).json({
    error: errorHandler.getErrorMessage(err)
    })
    }
}
  
  


export default {
    create,defaultPhoto,
    list,photo,shopByID,listByOwner
}