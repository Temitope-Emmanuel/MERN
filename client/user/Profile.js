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
import Divider from '@material-ui/core/Divider'
import DeleteUser from './DeleteUser'
import {read} from './api-user.js'
import {Redirect, Link} from 'react-router-dom'
import FollowProfileButton from "./FollowProfileButton"
import ProfileTabs from "./ProfileTabs"
import FindPeople from "./FindPeople"

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
  }
}))


const Profile = ({match}) => {
    const classes = useStyles()
    const [value,setValue] = React.useState({
        user:{},
        following:false,
    })
    const [alert,setAlert] = React.useState({
        error:"",
        redirectToSignIn:false
    })
    let photoUrl = "";
    const jwt = isAuthenticated()
    photoUrl = value.user._id ? 
    `/api/users/photo/${value.user._id}?${new Date().getTime()}`
    : '/api/users/defaultphoto'

    const checkFollow = (user) => {
        return user.followers.some((follower) => {
            return follower._id == jwt.user._id
        })
    }
    
    React.useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        read({
            userId:match.params.userId
        },
        {token:jwt.token},signal).then((data) => {
            if(data && data.error){
                setAlert({
                    ...alert,
                    redirectToSignIn:true
                })
            }else{
                let following = checkFollow(data)
                setValue({...value,user:data,following:following})
            }
        })
        return function cleanup(){
            abortController.abort()
        }
    },[match.params.userId])

    const clickFollowButton = (callApi) => {
        callApi({
            userId:jwt.user._id
        },{
            token:jwt.token
        },value.user._id).then((data) => {
            if(data.error){
                setAlert({...alert,error:data.error})
            }else{
                setValue({...value,user:data,following:!value.following})
            }
        })
    }

    if(alert.redirectToSignIn){
        return <Redirect to="/signin" />
    }
    if(!(value.user._id)){
        return(
            <div>
                Still loading...
            </div>
        )
    }else{
        console.log(value)
        return (
            <>
            <Paper className={classes.root} elevation={4}>
                    <Typography variant="h6" className={classes.title}>
                        Profile
                    </Typography>
                    <List dense>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar src={photoUrl} />
                            </ListItemAvatar>
                            <ListItemText primary={value.user.name}
                             secondary={value.user.email}/>
                            {jwt.user && jwt.user._id ==
                                value.user._id ? 
                                (<ListItemSecondaryAction>
                                        <Link to={"/user/edit/" + value.user._id} >
                                            <IconButton aria-label="Edit" color="primary" >
                                                <Edit/>
                                            </IconButton>
                                        </Link>
                                        <DeleteUser userId={value.user._id} />
                                    </ListItemSecondaryAction>
                                ):(
                                    <FollowProfileButton
                                     onButtonClick={clickFollowButton}
                                     following={value.following}/>
                                )}
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <ListItemText primary={value.user.about}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={"Joined: " + (
                                new Date(value.user.created)).toDateString()}/>
                        </ListItem>
                    </List>
                    {/* <ProfileTabs {...user} /> */}
            </Paper>
            <h3 style={{
                textAlign:"center",
                fontWeight:"400",
                fontSize:"2em"
            }} >People You Can Follow</h3>
            {/* <FindPeople/> */}
            </>
            )
    }
}


export default Profile