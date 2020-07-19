import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Icon from '@material-ui/core/Icon'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import {create} from './api-post.js'
import {isAuthenticated} from '../auth/auth-helper'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#efefef',
    padding: `${theme.spacing(3)}px 0px 1px`
  },
  card: {
    maxWidth:600,
    margin: 'auto',
    marginBottom: theme.spacing(3),
    backgroundColor: 'rgba(65, 150, 136, 0.09)',
    boxShadow: 'none'
  },
  cardContent: {
    backgroundColor: 'white',
    paddingTop: 0,
    paddingBottom: 0
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8
  },
  photoButton: {
    height: 30,
    marginBottom: 5
  },
  input: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: '90%'
  },
  submit: {
    margin: theme.spacing(2)
  },
  filename:{
    verticalAlign: 'super'
  }
}))

const NewPost = (props) => {
    const classes = useStyles()
    const [values,setValues] = useState({
        text:'',
        photo:null
       })
    const [alert,setAlert] = useState({
        error:'',
        submitting:false,
        user:{}
    })

    const jwt = isAuthenticated()
    
    useEffect(() => {
        setAlert({...alert,user:jwt.user})
    },[])

    const handleChange = name => event => {
        const value = name === 'photo'
          ? event.target.files[0]
          : event.target.value
        setValues({...values, [name]: value })
    }
    const clickPost = () => {
        setAlert({...alert,submitting:true})
        let postData = new FormData()
        postData.append('text',values.text)
        postData.append('photo',values.photo)
        create({
            userId:jwt.user._id
        },{
            token:jwt.token
        },postData).then((data) => {
            setAlert({...alert,submitting:false})
            if(data.error) {
                setAlert({...alert,error:data.error})
            }else{
                setValues({...values,text:'',photo:""})
                props.addUpdate(data)
            }
        })
    }
      

    const photoUrl = alert.user._id ? 
     `/api/users/photo/${alert.user._id}` : '/api/users/defaultphoto'
    
     return(
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardHeader
                    title={alert.user.name}
                    className={classes.cardHeader} 
                    avatar={
                        <Avatar src = {photoUrl} />
                    } />
                <CardContent className={classes.cardContent} >
                    <TextField 
                     placeholder="Share Your Thoughts"
                     multiline
                     rows={3}
                     value={values.text}
                     onChange={handleChange('text')}
                     className={classes.textField}
                     margin="normal"
                     />
                     <input accept="image/*" onChange={handleChange('photo')}
                      className={classes.input} id="icon-button-file" type="file" />
                      <label htmlFor="icon-button-file" >
                          <IconButton color="secondary" component="span"
                           className={classes.photoButton} >
                               <PhotoCamera/>
                          </IconButton>
                      </label>
                      <span className={classes.filename}>
                          {values.photo ? values.photo.name : "Select Image to upload for Post"}
                      </span>
                      {
                          values.error && (
                              <Typography component="p" color="error" >
                                  {/* <Icon color="error" className={classes.error}>error</Icon> */}
                                  {values.error}
                              </Typography>
                          )
                      }
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="contained"
                      disabled={alert.submitting && values.text === ''} className={classes.submit}
                      onClick={clickPost}
                    >
                         POST
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default NewPost