import express from "express"
import authCtrl from "../controllers/auth.controller"
import userCtrl from "../controllers/user.controller"
import courseCtrl from "../controllers/course.controller"

const router = express.Router()

// For retrieving picture for the course 
router.route('/api/courses/photo/:courseId')
  .get(courseCtrl.photo, courseCtrl.defaultPhoto)

router.route('/api/courses/defaultphoto')
  .get(courseCtrl.defaultPhoto)

  // Create a new course
router.route('/api/courses/by/:userId')
      .post(authCtrl.requireSignin,authCtrl.hasAuthorization,
        userCtrl.isEducator,courseCtrl.create)
      .get(authCtrl.requireSignin,authCtrl.hasAuthorization,
        courseCtrl.listByInstructor)


//   For performing specific query on the system
router.route('/api/courses/:courseId').get(courseCtrl.read)


router.param("userId",userCtrl.userByID)
router.param("courseId",courseCtrl.courseByID)

export default router