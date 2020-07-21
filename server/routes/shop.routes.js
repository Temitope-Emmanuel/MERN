import express from "express"
import authCtrl from "../controllers/auth.controller"
import userCtrl from "../controllers/user.controller"
import shopCtrl from "../controllers/shop.controller"

const router = express.Router()

// For creating and managing created shop
router.route("/api/shops/by/:userId")
     .post(authCtrl.requireSignin,authCtrl.hasAuthorization,
        userCtrl.isSeller,shopCtrl.create)
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization,
            shopCtrl.listByOwner)

// query all available shops
router.route('/api/shops').get(shopCtrl.list)

// query specific shop
router.route('/api/shop/:shopId')
      .get(shopCtrl.read)
      .put(authCtrl.requireSignin,shopCtrl.isOwner,
        shopCtrl.update)
        .delete(authCtrl.requireSignin,shopCtrl.isOwner,shopCtrl.remove)

// Getting the pictures for a shop
router.route('/api/shops/logo/:shopId')
  .get(shopCtrl.photo, shopCtrl.defaultPhoto)
router.route('/api/shops/defaultphoto')
  .get(shopCtrl.defaultPhoto)


router.param("userId",userCtrl.userByID)
router.param("shopId",shopCtrl.shopByID)

export default router