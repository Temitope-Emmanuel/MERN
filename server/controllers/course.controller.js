import Course from '../models/course.model'
import extend from 'lodash/extend'
import fs from 'fs'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'
import defaultImage from './../../client/assets/images/default.png'



const create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not be uploaded"
        })
      }
      let course = new Course(fields)
      course.instructor= req.profile
      if(files.image){
        course.image.data = fs.readFileSync(files.image.path)
        course.image.contentType = files.image.type
      }
      try {
        let result = await course.save()
        res.json(result)
      }catch (err){
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
    })
}

const isInstructor = (req, res, next) => {
    const isInstructor = req.course.instructor?._id == req.auth?._id
    if(!isInstructor){
      return res.status('403').json({
        error: "User is not authorized"
      })
    }
    next()
}

const listByInstructor = (req, res) => {
    Course.find({instructor: req.profile._id}, (err, courses) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(courses)
    }).populate('instructor', '_id name')
}

const photo = (req, res, next) => {
    if(req.course.image.data){
      res.set("Content-Type", req.course.image.contentType)
      return res.send(req.course.image.data)
    }
    next()
}

const defaultPhoto = (req, res) => {
    return res.sendFile(process.cwd()+defaultImage)
}
const courseByID = async (req,res,next,id) => {
    try{
      let course = await Course.findById(id).populate('instructor', '_id name')
        if(!course){
            return res.status(401).json({
                error:"Course does not Exist"
            })
        }
        req.course = course
        next()
    }catch(err){
        return res.status(400).json({
            error:"Could Not Retrieve Course"
        })
    }
}
const read = (req,res) => {
    req.course.image = undefined
    return res.json(req.course)
}

const newLesson = async (req,res) => {
  try{
    let {lesson} = req.body
    let result = await Course.findByIdAndUpdate(req.course._id,
                       {$push:{lessons:lesson},
                       updated:Date.now()},{new:true})
                       .populate('instructor','_id name').exec()
                res.json(result)
  }catch(err){
    return res.status(400).json({
      error:errorHandler.getErrorMessage(err)
    })
  }
}
  

  
export default {
    create,listByInstructor,read,isInstructor,
    photo,defaultPhoto,courseByID,newLesson
}