import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import {isAuthenticated} from './../auth/auth-helper'
import PostList from './PostList'
import {listNewsFeed} from './api-post.js'
import NewPost from './NewPost'

const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
    paddingTop: 0,
    paddingBottom: theme.spacing(3)
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    fontSize: '1em'
  },
  media: {
    minHeight: 330
  }
}))

const NewsFeed = (props) => {
    const classes = useStyles()
    const [posts,setPost] = useState([])
    const jwt = isAuthenticated()


    useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal
      
      listNewsFeed({
        userId:jwt.user._id
      },{
        token:jwt.token
      },signal).then((data) => {
        if(data.error){
          console.log(data.error)
        }else{
          setPost(data)
        }
      })
      return function cleanup(){
        abortController.abort()
      }
    },[])

    const addPost = (post) => {
        const updatedPosts = [...posts]
        updatedPosts.unshift(post)
        setPost(updatedPosts)
    }
    const removePost = (post) => {
        const removePost = [...posts]
        const idx = removePost.indexOf(post)
        removePost.splice(idx,1)
        setPost(removePost)
    }
    
    return(
        <Card className={classes.card}>
            <Typography type="title" className={classes.title}>
                Newsfeed
            </Typography>
            <NewPost addUpdate={addPost} />
            <Divider/>
            {posts.length > 0 ? (
              <PostList removeUpdate={removePost}
              post={posts}
               />
            ) : 
            <Typography type="body1" align="center">
              No Post to View. Follow People to view their post
              </Typography>}
        </Card>
    )
}

export default NewsFeed