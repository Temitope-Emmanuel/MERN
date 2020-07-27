import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import {Link} from "react-router-dom"
import Newsfeed from "../post/Newsfeed"
import FindPeople from "../user/FindPeople"
import {isAuthenticated} from "../auth/auth-helper"

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      margin: 30,
      display:"flex",
      justifyContent:"center",
      width:"100%",
      backgroundColor:"purple",
      flexDirection:"column",
      alignItems:"center"
    },
    card: {
      maxWidth: 600,
      margin: 'auto',
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
      textAlign:"center"
    },
    title: {
      padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
      color: theme.palette.text.secondary
    },
    media: {
      minHeight: 400
    },
    credit: {
      padding: 10,
      textAlign: 'right',
      backgroundColor: '#ededed',
      borderBottom: '1px solid #d0d0d0',
      '& a':{
        color: '#3f4771'
      } 
    }
  }))
  
const unicornbikeImg = "https://images.unsplash.com/photo-1573812195421-50a396d17893?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"
const Home = ({history}) => {
    const classes = useStyles()
    const jwt = isAuthenticated()
    
    return(
        <div className={classes.root}>
            {!jwt && (
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <Card className={classes.card}>
                            <Typography variant="h6" className={classes.title} >
                                Home Page
                            </Typography>
                            <CardMedia className={classes.media}
                             image={unicornbikeImg}
                            title="Unicorn Bicycle"
                            />
                            <Typography variant="body2" component="p"
                            className={classes.credit} color="textSecondary">
                                Photo by  
                                    <a href="https://unsplash.com/@utsavsrestha"
                                    target="_blank" rel="noopener noreferrer">
                                     utsavsrestha
                                    </a> on Unsplash
                            </Typography>
                            <CardContent>
                                <Typography type="h2" component="h2" >
                                    Welcome to the Mern Social home page
                                </Typography>
                                <Typography type="body1" >
                                    Sign in and follow people to start
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}
            {jwt &&
          <Grid container spacing={12}>
            <Grid item xs={6} sm={6}>
              <Newsfeed/>
            </Grid>
            <Grid item xs={6} sm={6}>
              <FindPeople/>
            </Grid>
          </Grid>
        }
        </div>
    )
}

export default Home