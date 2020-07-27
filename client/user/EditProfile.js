import React, {useState, useEffect} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'
import { makeStyles } from '@material-ui/core/styles'
import {isAuthenticated} from './../auth/auth-helper'
import {read, update} from './api-user.js'
import {Redirect} from 'react-router-dom'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment';


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  input: {
    display: 'none'
  },
  filename:{
    marginLeft:'10px'
  }
}))

const EditProfile = ({ match }) => {
  const classes = useStyles()
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    about:'',
    userId:'',
    photo:null
  })

  const [alert,setAlert] = useState({
    open: false,
    error: '',
    redirectToProfile: false
  })

  const [ isVisible,setIsVisible] = useState(false)
  const handleToggle = () => {
      setIsVisible(!isVisible)
   }

  const jwt = isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({
      userId: match.params.userId
    }, {token: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setAlert({...alert, error: data.error})
      } else {
        console.log("This is the data",data)
        setValues({...values, name: data.name, email: data.email})
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.userId])

  const clickSubmit = () => {
    let userData = new FormData()
    values.name && userData.append('name',values.name)
    values.email && userData.append('email',values.email)
    values.password && userData.append('password',values.password)
    values.about && userData.append('about',values.about)
    values.photo && userData.append('photo',values.photo)

    update({
      userId: match.params.userId
    }, {
      token: jwt.token
    }, userData).then((data) => {
        console.log(data)
      if (data && data.error) {
        setAlert({...alert, error: data.error})
      } else {
        setValues({...values, userId: data._id, redirectToProfile: true})
      }
    })
  }

  const handleChange = name => event => {
    const value = name === 'photo' ? 
    event.target.files[0]:
    event.target.value
    
    setValues({...values, [name]: value})
  }
  
    if (values.redirectToProfile) {
      return (<Redirect to={'/user/' + values.userId}/>)
    }
    
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Edit Profile
          </Typography>

          <input accept="image/*"
           onChange={handleChange('photo')}
           className={classes.input}
           id="icon-button-file" type="file" />
          <label htmlFor="icon-button-file">
            <Button variant="contained" color="default"
            component="span">
              Upload
              <FileUpload/>
            </Button>
          </label> 
          <span className={classes.filename}>
            {values.photo ? values.photo.name : ''}
          </span><br/>
          
          <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal"/><br/>
          <TextField
            id="multiline-flexible"
            label="About"
            multiline
            rows="2"
            value={values.about}
            onChange={handleChange('about')}
            className={classes.textField}
            margin="normal"
          /><br/>
          <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
          <TextField id="password" type={isVisible ? "text":"password"} label="Password"
            autoFocus={false} className={classes.textField} value={values.password}
             onChange={handleChange('password')} margin="normal"
             InputProps={{
                endAdornment:<InputAdornment position="end">
                    <IconButton onClick={handleToggle} >
                        {isVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
            }} 
            />
          <br/> {
            alert.error && (<Typography component="p" color="error">
              {/* <Icon color="error" className={classes.error}>error</Icon> */}
              {alert.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained"
           className={classes.submit} onClick={clickSubmit}>
               Submit
          </Button>
        </CardActions>
      </Card>
    )
}

export default EditProfile