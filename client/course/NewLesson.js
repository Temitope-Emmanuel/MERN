import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Add from '@material-ui/icons/AddBox'
import {makeStyles} from '@material-ui/core/styles'
import {newLesson} from './api-course'
import { isAuthenticated } from './../auth/auth-helper'

const useStyles = makeStyles(theme => ({
    form: {
        minWidth: 500
    }
}))


const NewLesson = (props) => {
    const classes = useStyles()
    const [open,setOpen] = useState(false)
    const [values, setValues] = useState({
        title: '',
        content: '',
        resource_url: ''
    })
    const [alert,setAlert] = useState({
        error:"",
        submit:true

      })
      
      const handleToggle = () => {
          setOpen(!open)
      }

      const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
      }
      const jwt = isAuthenticated()

      const clickSubmit = () => {
        const lesson = {
          title: values.title || undefined,
          content: values.content || undefined,
          resource_url: values.resource_url || undefined
        }
        newLesson({
          courseId: props.courseId,
          token: jwt.token
        }, lesson).then((data) => {
          if (data && data.error) {
            setValues({...values, error: data.error})
          } else {
              props.addLesson(data)
              setValues({...values, title: '',
              content: '',
              resource_url: ''})
              setOpen(false)
          }
        })
      }
    React.useEffect(() => {
        const isSubmit = isValid()
        setAlert({...alert,submit:!isSubmit})
    },[values])
    
    const isValid = () => {
        return ["title","content","resource_url"].every(
            (i) => values[i].length > 3 )
    }


      return (
        <>
          <Button aria-label="Add Lesson" color="primary"
           variant="contained" onClick={handleToggle}>
            <Add/> &nbsp; New Lesson 
          </Button>
          <Dialog open={open} onClose={handleToggle}
           aria-labelledby="form-dialog-title">
          <div className={classes.form}>
            <DialogTitle id="form-dialog-title">
                New Lesson for  <em>{props.title}</em>
            </DialogTitle>
            <DialogContent>
              <TextField
                margin="dense" fullWidth
                label="Title" type="text"
                value={values.title} onChange={handleChange('title')}
              /><br/>
              <TextField
                margin="dense" label="Content"
                type="text" multiline
                rows="5" fullWidth
                value={values.content} onChange={handleChange('content')}
              /><br/>
              <TextField
                margin="dense" label="Resource link"
                type="text" fullWidth
                value={values.resource_url} onChange={handleChange('resource_url')}
              /><br/>  
            </DialogContent>
            
            <DialogActions>
              <Button onClick={handleToggle}
               color="primary" variant="contained">
                Cancel
              </Button>
              <Button onClick={clickSubmit} disabled={alert.submit}
               color="secondary" variant="contained">
                Add
              </Button>
            </DialogActions>
            </div>
          </Dialog>
        </>
      )
}

NewLesson.propTypes = {
    courseId:PropTypes.string.isRequired,
    addLesson:PropTypes.func.isRequired,
    title:PropTypes.string.isRequired
}

export default NewLesson