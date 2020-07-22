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
import {remove} from './api-course.js'


const DeleteCourse = (props) => {
    const [open,setOpen] = useState(false)
    const jwt = isAuthenticated()
    const handleToggle = () => {
        setOpen(!open)
    }

    const deleteCourse = () => {
        remove({
          courseId: props.course._id,
          token: jwt.token
        }).then((data) => {
          if (data.error) {
            console.log(data.error)
          } else {
            setOpen(false)
            props.onRemove(props.course)
          }
        })
      }
      

      return (<span>
        <IconButton aria-label="Delete"
         onClick={handleToggle} color="secondary">
          <DeleteIcon/>
        </IconButton>
  
        <Dialog open={open} onClose={handleToggle}>
          <DialogTitle>{"Delete "+props.course.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Confirm to delete your course {props.course.name}.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleToggle} color="primary">
              Cancel
            </Button>
            <Button onClick={deleteCourse} color="secondary" autoFocus="autoFocus">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </span>)
  
}

DeleteCourse.propTypes = {
    course:PropTypes.object.isRequired,
    onRemove:PropTypes.func.isRequired
}

export default DeleteCourse