import React, {useState} from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {isAuthenticated} from './../auth/auth-helper'
import {remove} from './api-product.js'



const DeleteProduct = (props) => {
  const [open, setOpen] = useState(false)
  const [alert,setAlert] = useState({
    submitting:false
  })
  const jwt = isAuthenticated()

  const handleToggle = () => {
    setOpen(!open)
  }
  const deleteProduct = () => {
    setAlert({...alert,submitting:true})
    remove({
      shopId: props.shopId,
      productId: props.product._id,
      token: jwt.token
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setOpen(false)
        props.onRemove(props.product)
      }
    })
  }
  return (
  <span>
    <IconButton aria-label="Delete" onClick={handleToggle}
     color="secondary">
      <DeleteIcon/>
    </IconButton>
    <Dialog open={open} onClose={handleToggle}>
      <DialogTitle>{"Delete "+props.product.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Confirm to delete your product {props.product.name}.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleToggle} color="primary">
          Cancel
        </Button>
        <Button onClick={deleteProduct} disabled={alert.submitting}
         color="secondary" autoFocus="autoFocus">
          {alert.submitting ? `Deleting ${props.product.name}` : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  </span>
  )

}

DeleteProduct.PropTypes = {
    shopId:PropTypes.string.isRequired,
    product:PropTypes.object.isRequired,
    onRemove:PropTypes.func.isRequired
}

export default DeleteProduct