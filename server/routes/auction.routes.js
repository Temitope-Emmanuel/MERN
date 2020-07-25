import express from "express"
import authCtrl from "../controllers/auth.controller"
import userCtrl from "../controllers/user.controller"
import auctionCtrl from "../controllers/auction.controller"


const router = express.Router()


// Create a new auction 
router.route('/api/auctions/by/:userId').post(authCtrl.requireSignin,
    authCtrl.hasAuthorization,userCtrl.isSeller,
    auctionCtrl.create)

// Get the auction image
router.route('/api/auctions/image/:auctionId')
      .get(auctionCtrl.getPhoto,auctionCtrl.defaultPhoto)
router.route('/api/auctions/defaultphoto')
      .get(auctionCtrl.defaultPhoto)

// Query for a list of auctions available
router.route("/api/auctions").get(auctionCtrl.listOpen)

// Query for all auctions where user has a bid
router.route('/api/auctions/bid/:userId')
      .get(auctionCtrl.listByBidder)

// Query for a list of auctions created by a user
router.route('/api/auctions/by/:userId')
      .get(authCtrl.requireSignin,authCtrl.hasAuthorization,
        auctionCtrl.listBySeller)

router.route('/api/auctions/:auctionId')
      .put(authCtrl.requireSignin,auctionCtrl.isSeller,
            auctionCtrl.update)
      .delete(authCtrl.requireSignin,auctionCtrl.isSeller,
            auctionCtrl.remove)

// Read a Specific auction
router.route("/api/auction/:auctionId").get(auctionCtrl.read)


router.param('userId',userCtrl.userByID)
router.param('auctionId',auctionCtrl.auctionByID)

export default router