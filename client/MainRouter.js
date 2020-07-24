import React from 'react'
import {Route,Switch, Redirect} from "react-router-dom"
import PrivateRoute from "./auth/PrivateRoute"

import Menu from "./core/Menu"
import Home from "./core/Home"
import Users from "./user/Users"
import Signup from "./user/Signup"
import SignIn from "./auth/Signin"
import Profile from "./user/Profile"
import EditProfile from "./user/EditProfile"

import NewShop from "./shop/NewShop"
import Shops from "./shop/Shops"
import MyShops from "./shop/MyShops"
import Shop from "./shop/Shop"
import EditShop from "./shop/EditShop"

import NewProduct from "./product/NewProduct"
import Product from "./product/Product"
import EditProduct from "./product/EditProduct"

import Cart from "./cart/Cart"
import ShopOrders from "./order/shopOrders.js"
import Order from "./order/Order"

const MainRouter = () => {
    return(
        <>
            <Menu/>
            <Switch>
                <Route exact path="/users" component={Users} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/order/:orderId" component={Order} />
                <Route exact path="/product/:productId" component={Product} />
                <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
                <PrivateRoute path="/seller/shop/new" component={NewShop} />
                <PrivateRoute exact path="/seller/:shopId/:productId/edit" component={EditProduct}/>
                <PrivateRoute exact path="/seller/orders/:shop/:shopId" component={ShopOrders}/>
                <PrivateRoute exact path="/seller/shop/edit/:shopId" component={EditShop}/>
                <PrivateRoute path="/seller/:shopId/products/new" component={NewProduct} />
                <PrivateRoute path="/seller/shops" component={MyShops} />
                <Route exact path="/user/:userId" component={Profile} />
                <Route exact path="/shops/all" component={Shops} />
                <Route exact path="/shops/:shopId" component={Shop} />
                <Route exact path="/" component={Home} />
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        </>
    )
}

export default MainRouter