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
import DeleteUser from './DeleteUser'
import {read} from './api-user.js'
import {Redirect, Link} from 'react-router-dom'

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
    const [user,setUser] = React.useState({})
    const [redirectToSignIn,setRedirectToSignIn] = React.useState(false)
    let photoUrl = "";

    React.useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        const jwt = isAuthenticated()
        read({
            userId:match.params.userId
        },
        {token:jwt.token},signal).then((data) => {
            if(data && data.error){
                setRedirectToSignIn(true)
            }else{
                setUser(data)
                console.log(user._id)
            }
        })
        return function cleanup(){
            abortController.abort()
        }
    },[match.params.userId])
    
    // Added time in the url to bypass the image cache
    // For faster reloading
    photoUrl = user._id ? 
    `/api/users/photo/${user._id}?${new Date().getTime()}`
    : '/api/users/defaultphoto'

    if(redirectToSignIn){
        return <Redirect to="/signin" />
    }
    console.log(photoUrl)
    return (
        <Paper className={classes.root} elevation={4}>
                <Typography variant="h6" className={classes.title}>
                    Profile
                </Typography>
                <List dense>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar src={photoUrl} />
                        </ListItemAvatar>
                        <ListItemText primary={user.name} secondary={user.email}/>
                        {isAuthenticated().user && isAuthenticated().user._id ==
                            user._id && 
                            (<ListItemSecondaryAction>
                                    <Link to={"/user/edit/" + user._id} >
                                        <IconButton aria-label="Edit" color="primary" >
                                            <Edit/>
                                        </IconButton>
                                    </Link>
                                    <DeleteUser userId={user._id} />
                                </ListItemSecondaryAction>
                            )}
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <ListItemText primary={user.about}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={"Joined: " + (
                            new Date(user.created)).toDateString()}/>
                    </ListItem>
                </List>
        </Paper>
        )
}


export default Profile