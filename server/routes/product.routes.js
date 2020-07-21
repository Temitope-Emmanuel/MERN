import express from "express"
import authCtrl from "../controllers/auth.controller"
import shopCtrl from "../controllers/shop.controller"
import productCtrl from '../controllers/product.controller'

const router = express.Router()

// Query for finding specific products or category
router.route('/api/products').get(productCtrl.list)
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

// For Performing query for the categories
router.route('/api/products/categories').get(productCtrl.listCategories)
// Query for performing Read operations on specific products
router.route(`/api/products/:productId`)
      .get(productCtrl.read)

// For performing update and delete operations on specific product 
router.route('/api/product/:shopId/:productId')
      .put(authCtrl.requireSignin,shopCtrl.isOwner,productCtrl.update)
      .delete(authCtrl.requireSignin,shopCtrl.isOwner,productCtrl.remove)


router.param('shopId',shopCtrl.shopByID)
router.param('productId',productCtrl.productByID)



export default router