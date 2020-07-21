import express from "express"
import authCtrl from "../controllers/auth.controller"
import shopCtrl from "../controllers/shop.controller"
import productCtrl from '../controllers/product.controller'

const router = express.Router()

// Perform on product based on their shop identity
router.route('/api/products/by/:shopId')
.get(productCtrl.listByShop)
      .post(authCtrl.requireSignin,
            shopCtrl.isOwner,productCtrl.create)

// Query for the product image
router.route('/api/product/image/:productId')
.get(productCtrl.photo, productCtrl.defaultPhoto)
router.route('/api/product/defaultphoto')
      .get(productCtrl.defaultPhoto)

      // Get the latest products added
router.route('/api/products/latest').get(productCtrl.listLatest)
// get a list of related products
router.route('/api/products/related/:productId').get(productCtrl.listRelated)

// Query for performing CRUD operations on specific products
router.route(`/api/products/:productId`)
      .get(productCtrl.read)

router.param('shopId',shopCtrl.shopByID)
router.param('productId',productCtrl.productByID)



export default router