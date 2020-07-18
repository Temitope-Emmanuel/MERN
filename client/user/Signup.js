import React from "react"
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import {create} from './api-user.js'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {Link} from 'react-router-dom'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';


const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing(5),
      paddingBottom: theme.spacing(2)
    },
    error: {
      verticalAlign: 'middle'
    },
    title: {
      marginTop: theme.spacing(2),
      color: theme.palette.openTitle
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300
    },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing(2)
    }
}))
  


const SignUp = () => {    
    const classes = useStyles()
    const [values,setValues] = React.useState({
        name:'',
        password:'',
        email:''
    })

    const [alert,setAlert] = React.useState({
        open:false,
        error:"",
        submit:false
    })
    const [isVisible,setIsVisible] = React.useState(true)
    // const handleChange = (e) => {
    //     setValues({...values,[e.target.name]:e.target.value})
    // }
    React.useEffect(() => {
        const isSubmit = isValid()
        setAlert({...alert,submit:!isSubmit})
    },[values])
    
    const isValid = () => {
        return ["name","email","password"].every(
            (i) => values[i].length > 3 )
    }

    const handleChange = name => event => {
        setValues({...values,[name]:event.target.value})
    }
    console.log(values)

    const handleToggle = () => {
        setIsVisible(!isVisible)
    }

    const clickSubmit = () => {
        setAlert({...alert,error:""})
        create(values).then((data) => {
            if(data.error){
                if(data.error.indexOf("email already exists") !== -1){
                    setAlert({...alert,error:"Email Already Exist"})
                }else{
                    setAlert({...alert,error:data.error})
                }
            }else{
                setAlert({...alert,open:true})
            }
        })
    }

    return(
        <>
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h6" className={classes.title} >
                    Sign Up
                </Typography>
                    <TextField id="name" label="Name" margin="normal"
                       className={classes.textField} value={values.name}
                       onChange={handleChange('name')}/>
                      <br/>
                    <TextField id="email" type="email" label="Email"
                       className={classes.textField} value={values.email}
                       onChange={handleChange('email')} margin="normal"/>
                      <br/>
                    <TextField id="password" type={isVisible ? "text":"password"}
                       InputProps={{
                           endAdornment:<InputAdornment position="end">
                               <IconButton onClick={handleToggle} >
                                   {isVisible ? <Visibility /> : <VisibilityOff />}
                               </IconButton>
                           </InputAdornment>
                       }} 
                       label="Password" className={classes.textField}
                       value={values.password}  margin="normal"
                       onChange={handleChange('password')}/>
                       <br/> {
                            alert.error && (<Typography component="p" color="error">
                            {/* <Icon color="error" className={classes.error}>error</Icon> */}
                                {alert.error}</Typography>)
                            }
          </CardContent>
          <CardActions>
              <Button color="primary" disabled={alert.submit} className={classes.submit}
               variant="contained" onClick={clickSubmit}>
                   Submit
              </Button>
          </CardActions>
        </Card>
        <Dialog open={alert.open} disableBackdropClick={true} >
            <DialogTitle>New Title</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    New Account successfully created
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Link to="/signin" >
                    <Button color="primary" variant="contained"
                     autoFocus="autoFocus">
                         Sign In
                    </Button>
                </Link>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default SignUp