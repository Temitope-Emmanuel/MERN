import Enrollment from "../models/enrollment.model"
import dbErrorHandler from "../helpers/dbErrorHandler"

const findEnrollment = async (req,res,next) => {
    try{
        let enroll = await Enrollment.find({
            course:req.course._id,
            student:req.auth._id
        })
        if(enroll.length == 0){
            next()
        }else{
            res.json(enroll[0])
        }
    }catch(err){
        return res.status(400).json({
            error:dbErrorHandler.getErrorMessage(err)
        })
    }
}

const create = async (req,res) => {
    let newEnroll = {
        course:req.course,
        student:req.auth
    }
    newEnroll.lessonStatus = req.course.lessons.map((lesson) => (
        {lesson:lesson,complete:false}
    ))
    const enrollment = new Enrollment(newEnroll)
    try{
        let result = await enrollment.save()
        return res.status(200).json(result)
    }catch(err){
        return res.status(400).json({
            error:dbErrorHandler.getErrorMessage(err)
        })
    }
}


export default {
    findEnrollment,create
}