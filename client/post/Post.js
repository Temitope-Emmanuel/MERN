import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import CommentIcon from '@material-ui/icons/Comment'
import Divider from '@material-ui/core/Divider'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {isAuthenticated} from './../auth/auth-helper'
import {remove,like,unlike} from './api-post.js'
// import Comments from './Comments'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth:600,
    margin: 'auto',
    marginBottom: theme.spacing(3),
    backgroundColor: 'rgba(0, 0, 0, 0.06)'
  },
  cardContent: {
    backgroundColor: 'white',
    padding: `${theme.spacing(2)}px 0px`
  },
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  text: {
    margin: theme.spacing(2)
  },
  photo: {
    textAlign: 'center',
    backgroundColor: '#f2f5f4',
    padding:theme.spacing(1)
  },
  media: {
    height: 200
  },
  button: {
   margin: theme.spacing(1),
  }
}))

const Post = (props) => {
    const classes = useStyles()
    const jwt = isAuthenticated()

    const checkLike = (likes) => {
      return likes.indexOf(jwt.user._id) !== -1
    }
    const [values,setValues] = useState({
      like:checkLike(props.post.likes),
      likes:props.post.likes.length,
      comments:props.post.comments
    })
    const deletePost = () => {
      remove({
        postId:props.post._id
      },{
        token:jwt.token
      }).then((data) => {
        if(data.error){
          console.log(data.error)
        }else{
          props.onRemove(props.post)
        }
      })
    }
    const clickLike = () => {
      let callApi = values.like ? unlike : like
      callApi({
        userId:jwt.user._id
      },{
        token:jwt.token
      },props.post._id).then((data) => {
        if(data.error){
          console.log(data.error)
        }else{
          setValues({...values,
            like:!values.like,likes:data.likes.length
          })
        }
      })
    }
    console.log(values)
    return(
      <Card className={classes.card}>
        <CardHeader
         avatar={
           <Avatar src={`/api/users/photo/${props.post.postedBy._id}`} />
         }
         action={props.post.postedBy._id === jwt.user._id &&
        <IconButton onClick={deletePost}>
          <DeleteIcon/>
        </IconButton>}
        title={
          <Link to={`/user/${props.post.postedBy._id}`}>
            {props.post.postedBy.name}
          </Link>
        }
        subheader={(new Date(props.post.created)).toDateString()}
        className={classes.cardHeader}
         />
         <CardContent className={classes.cardContent} > 
         <Typography component="p" className={classes.text} >
           {props.post.text}
         </Typography>
         {
           props.post.photo && (
             <div className={classes.photo} >
               <img src={`/api/posts/photo/${props.post._id}`}
                className={classes.media} />
             </div>
           )}
         </CardContent>
         <CardActions>
           {
             values.like ? 
             <IconButton color="secondary" onClick={clickLike}
              className={classes.button} aria-label="Like" >
               <FavoriteIcon/>
             </IconButton> : 
             <IconButton aria-label="Unlike" onClick={clickLike}
              className={classes.button} color="secondary" >
                <FavoriteBorderIcon/>
             </IconButton>
           }
           <span>{values.likes}</span>
           {/* <IconButton aria-label="Comment" 
            className={classes.button} color="secondary">
              <CommentIcon/>
           </IconButton>
          <span>{values.comments.length}</span> */}
         </CardActions>
         {/* <Divider/>
         <Comments comments={values.comments} updateComments={updateComments}
          postId={props.post._id} /> */}
      </Card>
    )
}

Post.propsTypes = {
  post:PropTypes.object.isRequired,
  onRemove:PropTypes.func.isRequired
}

export default Post