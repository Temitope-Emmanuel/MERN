import express from "express"
import authCtrl from "../controllers/auth.controller"
import courseCtrl from "../controllers/course.controller"
import enrollmentCtrl from "../controllers/enrollment.controller"


const router = express.Router()

// Create a new enrollment
router.route('/api/enrollment/new/:courseId')
  .post(authCtrl.requireSignin, 
    enrollmentCtrl.findEnrollment, enrollmentCtrl.create)  

// Getting a list of enrolled courses
router.route("/api/enrollment/enrolled")
          .get(authCtrl.requireSignin,enrollmentCtrl.listEnrolled)
// Read an enrollment
router.route('/api/enrollment/:enrollmentId')
      .get(authCtrl.requireSignin,enrollmentCtrl.isStudent,
        enrollmentCtrl.read)

// Mark a lesson has completed
router.route('/api/enrollment/complete/:enrollmentId')
      .put(authCtrl.requireSignin,enrollmentCtrl.isStudent,enrollmentCtrl.complete)


router.param('courseId',courseCtrl.courseByID)
router.param('enrollmentId',enrollmentCtrl.enrollmentByID)

export default router