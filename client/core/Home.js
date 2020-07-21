import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import unicornbikeImg from './../assets/images/unicornbike.jpg'
import {Link} from "react-router-dom"
import Suggestions from "../product/Suggestions"
import {listLatest} from "../product/api-product"


const useStyles = makeStyles(theme => ({
    card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5)
    },
    title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px
    ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
    },
    media: {
    minHeight: 400
    },
    linkContainer:{
        width:"100%",
        display:"flex",
        justifyContent:"space-between"
    }
    }))


const Home = () => {
    const classes = useStyles()
    const [suggestions,setSuggestions] = React.useState([])

    React.useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        listLatest(signal).then((data) => {
            if(data.error){
                console.log(data.error)
            }else{
                setSuggestions(data)
            }
        })
        return function cleanup(){
            abortController.abort()
        }
    },[])
    return(
        <div className={classes.root}>
            <Grid container spacing={2} >
                <Grid item xs={6} sm={6}>
                {/* <Search  />
                <Categories/> */}
                </Grid>
                <Grid item xs={6} sm={6} >
                    <Suggestions products={suggestions}
                    title={"Latest Products"}
                     />
                </Grid>
            </Grid>
        </div>
      )
}

export default Home