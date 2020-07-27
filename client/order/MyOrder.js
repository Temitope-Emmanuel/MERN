import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import {isAuthenticated} from './../auth/auth-helper'
import {listByUser} from './api-order.js'
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    width: 600,
    margin: '12px 24px',
    padding: theme.spacing(3),
    backgroundColor: '#3f3f3f0d',
    margin:"2em auto"
  }),
  title: {
    margin: `${theme.spacing(2)}px 0 12px ${theme.spacing(1)}px`,
    color: theme.palette.openTitle,
    textAlign:"center",
    fontSize:"1.7em"
  }
}))


const MyOrder = () => {
    const classes = useStyles()
    const [order,setOrders] = useState([])
    const jwt = isAuthenticated()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        listByUser({
            userId:jwt.user._id,
            token:jwt.token
        },signal).then((data) => {
            if(data.error){
                console.log(data.error)
            }else{
                setOrders(data)
            }
        })
        return function cleanup(){
            abortController.abort()
        }
    },[])

    return(
        <Paper className={classes.root} elevation={4} >
            <Typography type="title" className={classes.title} >
                Your Orders
            </Typography>
            {order.length > 0 ? (
                <List dense>
                    {order.map((order,i) => (
                        <span key={order._id}>
                            <Link to={`/order/${order._id}`}>
                                <ListItem button >
                                    <ListItemText primary={
                                        <strong>
                                            {`Order # ${order._id}`}
                                        </strong>
                                    } secondary={
                                        (new Date(order.created)).toDateString()
                                    } />
                                </ListItem>
                            </Link>
                        </span>
                    ))}
                </List>
            ) : <Typography style={{textAlign:"center"}}  variant="body1" >You don't have any order </Typography>}
        </Paper>
    )
}

export default MyOrder