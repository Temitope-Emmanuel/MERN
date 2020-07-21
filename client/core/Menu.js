import React from "react"
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import {isAuthenticated,clearJWT} from './../auth/auth-helper'
import {Link, withRouter} from 'react-router-dom'


const isActive = (history,path) => {
    if(history.location.pathname == path)
       return {color:'#ff4081'}
    else
       return {color:"#ffffff"}
}
const isPartActive = (history, path) => {
    if (history.location.pathname.includes(path))
      return {color: '#bef67a'}
    else
      return {color: '#ffffff'}
  }
  

const Menu = ({history}) => (
    <AppBar position="static" >
        <Toolbar>
            <Typography variant="h6" color="inherit" >
                MERN Skeleton
            </Typography>
            <Link to="/" >
                <IconButton aria-label="Home" 
                 style={isActive(history,"/")} >
                     <HomeIcon/>
                </IconButton>
            </Link>
            <Link to="/users" >
                <Button style={isActive(history,"/users")} >
                    Users
                </Button>
            </Link>
            <Link to="/shops/all" >
                <Button style={isActive(history,"/shops/all")} >
                    View Shops
                </Button>
            </Link>
            {(!isAuthenticated()) && (
                <>
                    <Link to="/signup" >
                        <Button style={isActive(history,"/signup")} >
                            Sign Up
                        </Button>
                    </Link>
                    <Link to="/signin" >
                        <Button style={isActive(history,"/signin")} >
                            Sign in
                        </Button>
                    </Link>
                </>
            )}
            {
        isAuthenticated() && (<span>
          {isAuthenticated().user.seller && (
          <Link to="/seller/shops">
              <Button style={isPartActive(history, "/seller/")}>
                  My Shops
                </Button>
          </Link>)}
          <Link to={"/user/" + isAuthenticated().user._id}>
            <Button style={isActive(history, "/user/"+isAuthenticated().user._id)}>My Profile</Button>
          </Link>
          <Button color="inherit" onClick={() => {
              clearJWT(() => history.push('/'))
            }}>Sign out</Button>
        </span>)
      }
      </Toolbar>
    </AppBar>
)

export default withRouter(Menu)