import React from "react"
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import {authenticate} from './../auth/auth-helper'
import {Redirect} from 'react-router-dom'
import {signin} from "./api-auth"

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
  

const Signin = (props) => {
    const classes = useStyles()

    const [values,setValues] = React.useState({
        email:'',
        password:''
    })
    const [alert,setAlert] = React.useState({
        error:'',
        submit:true,
        redirectToReferrer:false
    })

    React.useEffect(() => {
        const isSubmit = isValid()
        setAlert({...alert,submit:!isSubmit})
    },[values])    

    const isValid = () => {
            return ["email","password"].every(
                (i) => values[i].length > 3 )
    }

    const clickSubmit = () => {
        signin(values).then(data => {
            if(data.error){
               return setAlert({...alert,error:data.error})
            }else if(data.token){
                authenticate(data,() => {
                    setAlert({...alert,
                        error:"",
                        redirectToReferrer:true
                    })
                })
            }
        })
    }
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
      }    

    const {redirectToReferrer} = alert

    if(redirectToReferrer){
        const {from} = props.location.state || {
            from :{
                pathname:'/'
            }
        }    
        return <Redirect to={from} />
    }

    return (
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6" className={classes.title}>
              Sign In
            </Typography>
            <TextField id="email" type="email" label="Email"
             className={classes.textField} value={values.email}
              onChange={handleChange('email')} margin="normal"/>
              <br/>
            <TextField id="password" type="password" label="Password"
             className={classes.textField} value={values.password}
              onChange={handleChange('password')} margin="normal"/>
            <br/> {
              alert.error && (<Typography component="p" color="error">
                {alert.error}
              </Typography>)
            }
          </CardContent>
          <CardActions>
            <Button disabled={alert.submit} color="primary"
             variant="contained" onClick={clickSubmit}
              className={classes.submit}>Submit</Button>
          </CardActions>
        </Card>
      )
  }

  export default Signin