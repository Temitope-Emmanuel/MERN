import React from 'react'
import {Route,Switch, Redirect} from "react-router-dom"
import PrivateRoute from "./auth/PrivateRoute"

import Home from "./core/Home"
import Users from "./user/Users"
import Signup from "./user/Signup"
import SignIn from "./auth/Signin"
import Profile from "./user/Profile"
import EditProfile from "./user/EditProfile"


const MainRouter = () => {
    return(
        <div>
            <Switch>
                <Route exact path="/users" component={Users} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/signin" component={SignIn} />
                <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
                <Route exact path="/user/:userId" component={Profile} />
                <Route exact path="/" component={Home} />
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        </div>
    )
}

export default MainRouter