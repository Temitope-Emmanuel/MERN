import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import {isAuthenticated} from './../auth/auth-helper'
import {listByShop} from './api-order.js'
// import ProductOrderEdit from './ProductOrderEdit'

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(1)}px` ,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  subheading: {
    marginTop: theme.spacing(1),
    color: '#434b4e',
    fontSize: '1.1em'
  },
  customerDetails: {
    paddingLeft: '36px',
    paddingTop: '16px',
    backgroundColor:'#f8f8f8'
  }
}))


const ShopOrders = ({match}) => {
    const classes = useStyles()
    const [orders,setOrders] = useState([])
    const [open,setOpen] = useState(0)

    const jwt = isAuthenticated()
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        listByShop({
            shopId:match.params.shopId,
            token:jwt.token
        },signal).then((data) => {
            if(data.error){
                console.log(data)
            }else{
                setOrders(data)
            }
        })
        return function cleanup(){
            abortController.abort()
        }
    },[])

    const handleClick = idx => evt => {
        setOpen(idx)
    }
    const updateOrders = (idx,updateOrder) => {
        let updateOrders = orders
        updateOrders[idx] = updateOrder
        setOrders([...updateOrders])
    }
    console.log(orders)
    return(
        <div className={classes.root}>
            <Paper  elevation={4}>
                <Typography type="title" className={classes.title} >
                    Orders in {match.params.shop}
                </Typography>
                <List dense>
                    {orders.map((order,idx) => (
                        <span key={idx}>
                            <ListItem button onClick={handleClick(idx)}>
                                <ListItemText primary={`Order # ${order._id}`}
                                 secondary={(new Date(order.created)).toDateString()}/>
                                 {open === idx ? <ExpandLess/> : <ExpandMore/>}
                            </ListItem>
                            <Divider/>
                            <Collapse component="li" in={open == idx}
                              timeout="auto" unmountOnExit>
                                   {/* <ProductOrderEdit shopId={match.params.shopId}
                                    order={order} orderIndex={idx}
                                     updateOrders={updateOrders}/> */}
                                <div className={classes.customerDetails}>
                                    <Typography type="subheading" component="h3"
                                     className={classes.subheading}>
                                        Deliver to:
                                    </Typography>
                                    <Typography type="subheading" component="h3"
                                     color="primary">
                                         <strong>
                                             {order.customer_name}
                                        </strong>
                                         ({order.customer_email})
                                    </Typography>
                                    <Typography type="subheading" component="h3"
                                     color="primary">
                                         {order.delivery_address.street}
                                    </Typography>
                                    <Typography type="subheading" component="h3"
                                     color="primary">{order.delivery_address.city},
                                      {order.delivery_address.state}
                                       {order.delivery_address.zipcode}
                                    </Typography>
                                    <Typography type="subheading" component="h3"
                                     color="primary">
                                        {order.delivery_address.country}
                                    </Typography><br/>
                                </div>
                            </Collapse>
                        </span>
                    ))}
                </List>
            </Paper>
        </div>
    )
}


export default ShopOrders