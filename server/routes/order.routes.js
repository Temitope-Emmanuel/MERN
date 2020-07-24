import express from "express"
import authCtrl from "../controllers/auth.controller"
import userCtrl from "../controllers/user.controller"
import orderCtrl from "../controllers/order.controller"
import productCtrl from "../controllers/product.controller"
import shopCtrl from "../controllers/shop.controller"

const router = express.Router()

// Get a list of order by a user
router.route('/api/orders/user/:userId')
      .get(authCtrl.requireSignin,orderCtrl.listByUser)

// Get the list of available statuses
router.route('/api/order/status_values')
.get(orderCtrl.getStatusValues)

// Get more detail about an order 
router.route('/api/order/:orderId').get(authCtrl.requireSignin,orderCtrl.read)

      // Creates a new order
router.route("/api/orders/:userId")
      .post(authCtrl.requireSignin,
        productCtrl.decreaseQuantity,orderCtrl.create)

// list the amount of order that a shop has
router.route('/api/orders/shop/:shopId').get(authCtrl.requireSignin,
                shopCtrl.isOwner,orderCtrl.listByShop)


// Update a certain order
router.route('/api/order/status/:shopId')
      .put(authCtrl.requireSignin,shopCtrl.isOwner,
        orderCtrl.update)

// For a cancelled order
router.route('/api/order/:shopId/cancel/:productId')
      .put(authCtrl.requireSignin,shopCtrl.isOwner,
  productCtrl.increaseQuantity,orderCtrl.update)

// For processing charge
router.route('/api/order/:orderId/charge/:userId/:shopId')
      .put(authCtrl.requireSignin,shopCtrl.isOwner,
        userCtrl.createCharge,orderCtrl.update)


router.param('userId',userCtrl.userByID)
router.param('shopId',shopCtrl.shopByID)
router.param('orderId',orderCtrl.orderByID)
router.param('productId',productCtrl.productByID)

export default router