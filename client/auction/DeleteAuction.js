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
import {isAuthenticated} from '../auth/auth-helper'
import {remove} from './api-auction.js'


const DeleteAuction = (props) => {
  const [open, setOpen] = useState(false)
  const jwt = isAuthenticated()
  const handleToggle = () => {
    setOpen(true)
  }
  const deleteAuction = () => {
    remove({
      auctionId: props.auction._id,
      token: jwt.token
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setOpen(false)
        props.onRemove(props.auction)
      }
    })
  }

  return(
      <span>
          <IconButton aria-label="Delete" onClick={handleToggle}
           color="secondary">
        <DeleteIcon/>
      </IconButton>

      <Dialog open={open} onClose={handleToggle}>
        <DialogTitle>
            {"Delete "+props.auction.itemName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your auction <strong><em>{props.auction.itemName}</em></strong>.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToggle} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteAuction} color="secondary"
           autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      </span>
  )
}

DeleteAuction.propTypes = {
    auction:PropTypes.object.isRequired,
    onRemove:PropTypes.func.isRequired
}

export default DeleteAuction