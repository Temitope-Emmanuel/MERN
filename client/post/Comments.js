import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import CardHeader from '@material-ui/core/CardHeader'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import Icon from '@material-ui/core/Icon'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import {makeStyles} from '@material-ui/core/styles'
import {comment, uncomment} from './api-post.js'
import {isAuthenticated} from './../auth/auth-helper'
import Dialog from '@material-ui/core/Dialog'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import InputAdornment from '@material-ui/core/InputAdornment';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'


const useStyles = makeStyles(theme => ({
    cardHeader: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    },
    smallAvatar: {
      width: 55,
      height: 55
    },
    commentField: {
      width: '96%'
    },
    commentText: {
      backgroundColor: 'white',
      padding: theme.spacing(1),
      margin: `2px ${theme.spacing(2)}px 2px 2px`
    },
    commentDate: {
      display: 'block',
      color: 'gray',
      fontSize: '0.8em'
   },
   commentDelete: {
     fontSize: '1.6em',
     verticalAlign: 'middle',
     cursor: 'pointer'
   }
  }))

const Comments = (props) => {
    const classes = useStyles()
    const [text,setText] = useState("")
    const [open,setOpen] = useState(false)
    const jwt = isAuthenticated()

    const handleChange = (evt) => {
        setText(evt.target.value)
    }
    const handleToggle = () => {
        setOpen(!open)
    }
    const addEmoji = e => {
        setText(text.concat(e.native))
        handleToggle()
    }
    const addComment = (evt) => {
        if(evt.keyCode == 13 && evt.target.value){
            evt.preventDefault()
            comment({
                userId:jwt.user._id
            },{
                token:jwt.token
            },props.postId,{text:text}).then((data) => {
                if(data.error){
                    console.log(data.error)
                }else{
                    setText('')
                    props.updateComments(data.comments)
                }
            })
        }
    }
    const deleteComment = comment => evt => {
        uncomment({
            userId:jwt.user._id
        },{
            token:jwt.token
        },props.postId,comment).then((data) => {
            if(data.error){
                console.log(data.error)
            }else{
                props.updateComments(data.comments)
            }
        })
    }
    const commentBody = item => {
        return(
            <p className={classes.commentText}>
                <Link to={`/user/${item.postedBy._id}`} >
                    {item.postedBy.name}
                </Link> <br/>
                {item.text}
                <span className={classes.commentDate}>
                    {(new Date(item.created)).toDateString()} |
                    {jwt.user._id === item.postedBy._id &&
                    <Icon className={classes.commentDelete}
                     onClick={deleteComment(item)}>
                         delete
                    </Icon>
                    }
                </span>
            </p>
        )
    }


    return(
        <div>
            <Dialog open={open} disableBackdropClick
             onClose={handleToggle}>
                <Picker title='Choose a Reaction'
                 onSelect={addEmoji} 
           />
        </Dialog>
            <CardHeader avatar={
            <Avatar
            src={`/api/users/photo/${jwt.user._id}?${new Date().getTime()}`}
            className={classes.smallAvatar} />
        } title={
            <TextField
            onKeyDown={addComment}
            multiline
            value={text}
            onChange = {handleChange}
            placeholder="Write Something"
            className={classes.commentField}
            InputProps={{
                endAdornment:(
                  <InputAdornment position="end">
                    <IconButton onClick={handleToggle}>
                    <EmojiEmotionsIcon/>
                    </IconButton>
                  </InputAdornment>
                )
              }}
            margin="normal"
            />
        } className={classes.cardHeader} />
        {props.comments.map((item,i) => {
            return(
                <CardHeader 
                 avatar={
                     <Avatar className={classes.smallAvatar} variant="square"
                     src={`/api/users/photo/${item.postedBy._id}?${new Date().getTime()}`}
                     />
                    } title={commentBody(item)} key={i}
                      className={classes.cardHeader}
                    />
            )
        })}
        </div>
        )
}

Comments.propTypes = {
    postId:PropTypes.string.isRequired,
    comments:PropTypes.array.isRequired,
    updateComments:PropTypes.func.isRequired
}

export default Comments