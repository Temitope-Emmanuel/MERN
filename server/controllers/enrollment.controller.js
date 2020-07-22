import Enrollment from "../models/enrollment.model"
import dbErrorHandler from "../helpers/dbErrorHandler"

const findEnrollment = async (req,res,next) => {
    console.log("readhinf enrollment")
    try{
        let enroll = await Enrollment.find({
            course:req.course._id,
            student:req.auth._id
        })
        if(enroll.length == 0){
            console.log("success at 0",enroll)
            next()
        }else{
            console.log("success at !0",enroll)
            res.json(enroll[0])
        }
    }catch(err){
        console.log("there/s been an error",err)
        return res.status(400).json({
            error:dbErrorHandler.getErrorMessage(err)
        })
    }
}

const create = async (req,res) => {
    console.log("in the create enrollment")
    let newEnroll = {
        course:req.course,
        student:req.auth
    }
    newEnroll.lessonStatus = req.course.lessons.map((lesson) => (
        {lesson:lesson,complete:false}
    ))
    const enrollment = new Enrollment(newEnroll)
    try{
        console.log("sucess in thecreate route",result)
        let result = await enrollment.save()
        return res.status(200).json(result)
    }catch(err){
        return res.status(400).json({
            error:dbErrorHandler.getErrorMessage(err)
        })
    }
}

const enrollmentByID = async (req,res,next,id) => {
    console.log("reahcing by ID")
    try{
        let enrollment = await Enrollment.findById(id)
                                        .populate({path:'course',populate:{path:'instructor'}})
                                        .populate('student','_id name')
        if(!enrollment){
            console.log("error not found")
            return res.status(400).json({
                error:"Enrollment not Found"
            })
        }
        req.enrollment = enrollment
        console.log("success")
        next()
    }catch(err){
        console.log("error not found",err)
        return res.status(400).json({
            error:"Could not retrieve enrollment"
        })
    }
}
const read = (req,res) => {
    return res.json(req.enrollment)
}
const isStudent = (req,res,next) => {
    console.log("is student")
    const isStudent = req.auth?._id == req.enrollment.student._id
    if(!isStudent){
        return res.status(403).json({
            error:"User is not enrolled"
        })
    }
    console.log('success at student')
    next()
}


export default {
    findEnrollment,create,read,
    enrollmentByID,isStudent
}