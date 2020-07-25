import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Suggestions from "../product/Suggestions"
import {listLatest,listCategories} from "../product/api-product"
import {listByOpen} from "../auction/api-auction"
import Search from "../product/Search"
import Categories from "../product/Categories"
import Auctions from "../auction/Auctions"

const useStyles = makeStyles(theme => ({
    root:{
        flexGrow:1,
        margin:30
    }
}))

const Home = () => {
    const classes = useStyles()
    const [suggestions,setSuggestions] = React.useState([])
    const [categories,setCategories] = React.useState([])
    const [auctions,setAuctions] = React.useState([])


    React.useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        listByOpen(signal).then((data) => {
            if(data.error){
                console.log(data.error)
            }else{
                console.log(data)
                setAuctions(data)
            }
        })
        return function cleanup(){
            abortController.abort()
        }
    },[])
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
    React.useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        listCategories(signal).then((data) => {
            if(data.error){
                console.log("there bess an error")
                console.log(data.error)
            }else{
                setCategories(data)
            }
        })
        return function cleaup(){
            abortController.abort()
        }
    },[])
    const removeAuction = (auction) => {
        const updatedAuctions = [auctions]
        const idx = updatedAuctions.indexOf(auction)
        updatedAuctions.splice(idx,1)
        setAuctions([...updatedAuctions])
    }
    return(
        <div className={classes.root}>
            <Grid container spacing={2} >
                <Grid item xs={8} sm={8}>
                <Search categories={categories}  />
                <Categories categories={categories} />
                </Grid>
                <Grid item xs={4} sm={4} >
                    <Suggestions products={suggestions}
                    title={"Latest Products"}
                     />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Typography variant="subtitle1">
                        List Of Available Bids
                    </Typography>
                    <Auctions auctions={auctions}
             removeAuction={removeAuction} />
                </Grid>
            </Grid>
        </div>
      )
}

export default Home