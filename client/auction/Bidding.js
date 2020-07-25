import React, {useState, useEffect}  from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {isAuthenticated} from '../auth/auth-helper'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'

// const io = require("socket.io-client")
// const socket = io()
const useStyles = makeStyles(theme => ({
    bidHistory: {
        marginTop: '20px',
        backgroundColor: '#f3f3f3',
        padding: '16px'
    },
    placeForm: {
        margin: '0px 16px 16px',
        backgroundColor: '#e7ede4',
        display: 'inline-block'
    },
    marginInput: {
        margin: 16
    },
    marginBtn: {
        margin: '8px 16px 16px'
    }
}))


const Bidding = (props) => {
    const classes = useStyles()
    const [bid,setBid] = useState('')
    const jwt = isAuthenticated()

    // useEffect(() => {
    //     socket.emit('join auction room',{room:props.auction._id})
    //     return() => {
    //         socket.emit('leave auction room',{
    //             room:props.auction._id
    //         })
    //     }
    // },[])
    // useEffect(() => {
    //     socket.on('new bid',payload => {
    //         props.updateBids(payload)
    //     })
    //     return () => {
    //         socket.off('new bid')
    //     }
    // })
    // const handleChange = evt => {
    //     setBid(evt.target.value)
    // }

    return(
        <div>
            {!props.justEnded && new Date() < new Date(props.auction.bidEnd) && 
            <div className={classes.placeForm}>
                <TextField id="bid" label="Your bid ($)"
                value={bid} onChange={handleChange}
                helperText={`Enter $${Number(minBid)+1} or more`}
                className={classes.marginInput}
                /><br/>
                <Button variant="contained" className={classes.marginBtn}
                 color="secondary" disabled={bid < (minBid + 1)} 
                 onClick={placeBid}>
                    Place Bid
                </Button>
            </div>}
            <div className={classes.bidHistory}>
                <Typography variant="h6" >
                    All bids
                </Typography><br/>
                <Grid container spacing={4}>
                    <Grid item xs={3} sm={4}>
                        <Typography variant="subtitle1" color="primary">
                            Bid Amount
                        </Typography>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                        <Typography variant="subtitle1" color="primary" >
                            Bid Time
                        </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                        <Typography variant="subtitle1" color="primary" >
                            Bidder
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}


export default Bidding