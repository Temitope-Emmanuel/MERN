import React, { useEffect } from "react"
import {isAuthenticated} from "../auth/auth-helper"
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import Person from '@material-ui/icons/Person'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import DeleteUser from './DeleteUser'
import {read,update} from './api-user.js'
import {listBySeller} from "../auction/api-auction"
import {Redirect, Link} from 'react-router-dom'
// import config from '../../config/config'
// import stripeButton from "../assets/images/stripeButton.png"
import MyOrder from "../order/MyOrder"
import Auctions from "../auction/Auctions"

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle
  },
  stripe_connect: {
    marginRight: '10px',
  },
  stripe_connected: {
    verticalAlign: 'super',
    marginRight: '10px'
  },
  auctions:{
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center",
      padding:theme.spacing(1.3,1),
      width:"100%",
      "& a":{
          textDecoration:"none"
      }
  }
}))


const Profile = ({match,history}) => {
    const classes = useStyles()
    const [user,setUser] = React.useState({})
    const [auctions,setAuctions ]= React.useState([])
    const [redirectToSignIn,setRedirectToSignIn] = React.useState(false)
    const jwt = isAuthenticated()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        listBySeller({
            userId:jwt.user._id,
            token:jwt.token
        },signal).then((data) => {
            if(data.error){
                // setRedirectToSignIn(true)
                console.log(data.error)
            }else{
                console.log("success",data)
                setAuctions(data)
            }
        })
    },[])

    React.useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        read({
            userId:match.params.userId,
            token:jwt.token
        }
        ,signal).then((data) => {
            if(data && data.error){
                setRedirectToSignIn(true)
            }else{
                setUser(data)
            }
        })
        return function cleanup(){
            abortController.abort()
        }
    },[match.params.userId])
    const setStripe = () => {
        update({
            userId: match.params.userId,
            token: jwt.token
          }
          ,{stripe_seller:true}).then((data) => {
              console.log(data)
            if (data && data.error) {
              setAlert({...alert, error: data.error})
            } else {
                history.push("/seller/stripe/connect")
            }
          })
    }

    const removeAuction = (auction) => {
        console.log(auction)
        const updatedAuctions = [auctions]
        const idx = updatedAuctions.indexOf(auction)
        updatedAuctions.splice(idx,1)
        setAuctions([...updatedAuctions])
    }

    if(redirectToSignIn){
        return <Redirect to="/signin" />
    }
    return (
        <>
        <Paper className={classes.root} elevation={4}>
                <Typography variant="h6" className={classes.title}>
                    Profile
                </Typography>
                <List dense>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Person/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={user.name}
                         secondary={user.email}/>
                        { jwt && jwt.user._id ==
                            user._id && 
                            (<ListItemSecondaryAction>
                                    <Link to={"/user/edit/" + user._id} >
                                        <IconButton aria-label="Edit"
                                         color="primary" >
                                            <Edit/>
                                        </IconButton>
                                    </Link>
                                    <DeleteUser userId={user._id}/>
                                </ListItemSecondaryAction>
                            )}
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <ListItemText primary={"Joined: " + (
                            new Date(user.created)).toDateString()}/>
                    </ListItem>
                </List>
        <MyOrder/>
        <Paper className={classes.auctions} elevation={4} >
            <Typography style={{display:"inline"}} type="title" color="primary" >  
            Auctions you created
            </Typography>
            <Link style={{display:"inline"}} to="/auction/new">
              <Button color="primary" variant="contained">
                {/* <Icon className={classes.leftIcon}>add_box</Icon> */}
                Create A New Auction
              </Button>
            </Link>
            <Auctions auctions={auctions}
             removeAuction={removeAuction} />
        </Paper>
        </Paper>
        </>
        )
}


export default Profile