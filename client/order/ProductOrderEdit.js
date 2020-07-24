import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import {isAuthenticated} from './../auth/auth-helper'
import { update } from 'lodash'
import {getStatusValues, update, cancelProduct, processCharge} from './api-order.js'

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4),
    paddingBottom: 0
  },
  listImg: {
    width: '70px',
    verticalAlign: 'top',
    marginRight: '10px'
  },
  listDetails: {
    display: "inline-block"
  },
  listQty: {
    margin: 0,
    fontSize: '0.9em',
    color: '#5f7c8b'
  },
  textField: {
    width: '160px',
    marginRight: '16px'
  },
  statusMessage: {
    position: 'absolute',
    zIndex: '12',
    right: '5px',
    padding: '5px'
  }
}))



const ProductOrderEdit = (props) => {
    const classes = useStyles()
    const [values,setValues] = useState({
        open:0,
        statusValues:[],
        error:''
    })
    const jwt = isAuthenticated()

    // useEffect(() => {
    //     const abortController = new AbortController()
    //     const signal = abortController.signal
    //     getStatusValues(signal).then((data) => {
    //         if(data.error){
    //             setValues({...values,error:"Could not get status"})
    //         }else{
    //             setValues({...values,statusValues:data,error:''})
    //         }
    //     })
    //     return function cleanup(){
    //         abortController.abort()
    //     }
    // },[])

    const handleStatusChange = prodIdx => evt => {
        let {order} = props
        let {value} = evt.target
        order.products[prodIdx].status = value
        let product = order.products[prodIdx]
        if(value == "Cancelled"){
            cancelProduct({
                shopId:props.shopId,
                productId:product.product._id,
                token:jwt.token
            },{
                cartItemId:product._id,
                status:value,
                quantity:product.quantity
            }).then((data) => {
                if(data.error){
                    setValues({...values,error:"Status not updated,try again"})
                }else{
                    props.updateOrders(props.orderIndex,order)
                    setValues({
                        ...values,error:''
                    })
                }
            })
        }else if(value == "Processing"){
         processCharge({
             userId:jwt.user._id,
             shopId:props.shopId,
             orderId:order._id,
             token:jwt.token
         },{
             cartItemId:product._id,
             status:value,
             amount:(product.quantity * product.product.price)
         }).then((data) => {
            if(data.error){
                setValues({...values,error:"Status not updated,try again"})
            }else{
                props.updateOrders(props.orderIndex,order)
                setValues({
                    ...values,error:''
                })
            }
        })         
        }else{
            update({
                shopId:props.shopId,
                token:jwt.token
            },{
                cartItemId:product._id,
                status:value
            }).then((data) => {
                if(data.error){
                    setValues({...values,error:"Status not updated,try again"})
                }else{
                    props.updateOrders(props.orderIndex,order)
                    setValues({
                        ...values,error:''
                    })
                }
            })
        }
    }

    return(
        <div>
            <Typography component="span"
             color="error" className={classes.statusMessage}>
                 {values.error}
            </Typography>
            <List disablePadding style={{backgroundColor:"#f8f8f8"}}>
                {props.order.products.map((item,idx) => (
                    <span key={idx}>
                        {item.shop ==props.shopId && 
                        <ListItem button className={classes.nested} >
                            <ListItemText   primary={<div>
                                    <img className={classes.listImg} src={'/api/product/image/'+item.product._id}/>
                                    <div className={classes.listDetails}>
                                      {item.product.name}
                                      <p className={classes.listQty}>{"Quantity: "+item.quantity}</p>
                                    </div>
                                  </div>}/>
                                  <TextField
                                id="select-status"
                                select
                                label="Update Status"
                                className={classes.textField}
                                value={item.status}
                                onChange={handleStatusChange(index)}
                                SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                                }}
                                margin="normal"
                            >
                                {values.statusValues.map(option => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                                ))}
                            </TextField>
                        </ListItem>}
                        <Divider style={{margin:"auto",width:"80%"}} />
                    </span>
                ))}
            </List>
        </div>
    )
}


ProductOrderEdit.propTypes = {
    shopId:PropTypes.string.isRequired,
    order:PropTypes.object.isRequired,
    orderIndex:PropTypes.number.isRequired,
    updateOrders:PropTypes.func.isRequired,
}

export default ProductOrderEdit