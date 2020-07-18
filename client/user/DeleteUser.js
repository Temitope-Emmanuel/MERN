import React from "react"
import {Redirect} from "react-router-dom"
import {isAuthenticated,clearJWT} from "../auth/auth-helper"
import {remove} from "./api-user"
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'


const DeletedUser = (props) => {
    const [open,setOpen] = React.useState(false)
    const [redirect,setRedirect] = React.useState(false)

    const clickButton = () => {
        setOpen(!open)
    }
    const deleteAccount = () => {
        const jwt = isAuthenticated()
        remove({
            userId:props.userId
        },{token:jwt.token}).then((data) => {
            if(data && data.error){
                console.log(data.error)
            }else{
                clearJWT(() => console.log("deleted"))
                setRedirect(true)
            }
        })
    }
    if(redirect){
        return <Redirect to="/" />
    }

    return (
      <span>
        <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
          <DeleteIcon/>
        </IconButton>
  
        <Dialog open={open} onClose={clickButton}>
          <DialogTitle>{"Delete Account"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Confirm to delete your account.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={clickButton} color="primary">
              Cancel
            </Button>
            <Button onClick={deleteAccount} color="secondary" autoFocus="autoFocus">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </span>
    )
}

DeletedUser.propTypes = {
    userId:PropTypes.string.isRequired
}
export default DeletedUser