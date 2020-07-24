import React from "react"
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
// import DeleteUser from './DeleteUser'
import {read,update} from './api-user.js'
import {Redirect, Link} from 'react-router-dom'
import NewShop from "../shop/NewShop"
import config from '../../config/config'
import stripeButton from "../assets/images/stripeButton.png"

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
  }
}))


const Profile = ({match,history}) => {
    const classes = useStyles()
    const [user,setUser] = React.useState({})
    const [redirectToSignIn,setRedirectToSignIn] = React.useState(false)
    const jwt = isAuthenticated()

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

    if(redirectToSignIn){
        return <Redirect to="/signin" />
    }
    console.log(jwt.user.seller)
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
                        <ListItemText primary={user.name} secondary={user.email}/>
                        {jwt.user?._id ==
                            user._id && 
                            (<ListItemSecondaryAction>
                                    <Link to={"/user/edit/" + user._id} >
                                        <IconButton aria-label="Edit" color="primary" >
                                            <Edit/>
                                        </IconButton>
                                    </Link>
                                    {user.seller && user.stripe_seller ? (
                                        <Button disabled className={classes.stripe_connected}>
                                            Stripe connected
                                        </Button>
                                    ) : (
                                        (
                                        // <a href={"https://connect.stripe.com/oauth/authorize?response_type=code&client_id="+config.stripe_connect_test_client_id+"&scope=read_write"}
                                        //  className={classes.stripe_connect}>
                                        //      <img src={stripeButton}/>
                                        // </a>
                                        <Button className={classes.stripe_connect} >
                                            <img src={stripeButton} />
                                        </Button>
                                        )
                                )}
                                </ListItemSecondaryAction>
                            )}
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <ListItemText primary={"Joined: " + (
                            new Date(user.created)).toDateString()}/>
                    </ListItem>
                </List>
        </Paper>
        {jwt.user.seller && <NewShop/> }
        </>
        )
}


export default Profile