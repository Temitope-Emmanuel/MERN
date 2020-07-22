import express from "express"
import authCtrl from "../controllers/auth.controller"
import userCtrl from "../controllers/user.controller"
import courseCtrl from "../controllers/course.controller"

const router = express.Router()

// Create a new course
router.route('/api/courses/by/:userId')
      .post(authCtrl.requireSignin,authCtrl.hasAuthorization,
        userCtrl.isEducator,courseCtrl.create)

router.param("userId",userCtrl.userByID)

export default router