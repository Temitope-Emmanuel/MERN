import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  gridList: {
    width: 500,
    height: 220,
  },
  tileText: {
    textAlign: 'center',
    marginTop: 10
  }
}))

const FollowGrid = (props) => {
    const classes = useStyles()
    return(
        <div className={classes.root}>
            <GridList cellHeight={160} cols={4}
             className={classes.gridList}>
                 {
                     props.people.map((person,i) => {
                         return(
                             <GridListTile key={i}
                              style={{'height':120}}>
                                  <Link to={`/user/${person._id}`} >
                                      <Avatar className={classes.bigAvatar}
                                       src={`/api/users/photo/${person._id}`} />
                                       <Typography className={classes.tileText} >
                                           {person.name}
                                       </Typography>
                                  </Link>
                             </GridListTile>
                         )})
                 }
            </GridList>
        </div>
    )
}

FollowGrid.propTypes = {
    people:PropTypes.array.isRequired
}

export default FollowGrid