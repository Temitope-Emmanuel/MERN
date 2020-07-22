import React, {useState, useEffect}  from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Edit from '@material-ui/icons/Edit'
import PeopleIcon from '@material-ui/icons/Group'
import CompletedIcon from '@material-ui/icons/VerifiedUser'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import {read, update} from './api-course.js'
import {Link, Redirect} from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
// import {enrollmentStats} from './../enrollment/api-enrollment'
import NewLesson from './NewLesson'
// import DeleteCourse from './DeleteCourse'
// import Enroll from './../enrollment/Enroll'
import {isAuthenticated} from './../auth/auth-helper'

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        maxWidth: 800,
        margin: 'auto',
        padding: theme.spacing(3),
        marginTop: theme.spacing(12)
      }),
  flex:{
    display:'flex',
    marginBottom: 20,
    flexDirection:"column"
    },
  card: {
    padding:'24px 40px 40px'
  },
  subheading: {
    margin: '10px',
    color: theme.palette.openTitle,
    fontSize:"1.2em"
  },
  details: {
    margin: '16px',
  },
  sub: {
    display: 'block',
    margin: '3px 0px 5px 0px',
    fontSize: '0.9em'
  },
  media: {
    height: 190,
    display: 'inline-block',
    width: '100%',
    marginLeft: '16px'
  },
  icon: {
    verticalAlign: 'sub'
  },
  category:{
    color: '#5c5c5c',
    fontSize: '0.9em',
    padding: '3px 5px',
    backgroundColor: '#dbdbdb',
    borderRadius: '0.2em',
    marginTop: 5
  },
  action: {
    margin: '10px 0px',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  statSpan: {
    margin: '7px 10px 0 10px',
    alignItems: 'center',
    color: '#616161',
    display: 'inline-flex',
    '& svg': {
      marginRight: 10,
      color: '#b6ab9a'
    }
  },
  enroll:{
    float: 'right'
  }
}))

const Course = ({match}) => {
    const classes = useStyles()
    const [course, setCourse] = useState({instructor:{}})
    const [values, setValues] = useState({
        redirect: false,
        error: ''
      })
    const [open, setOpen] = useState(false)
    const jwt = isAuthenticated()
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
    
        read({courseId: match.params.courseId}, signal).then((data) => {
          if (data.error) {
            setValues({...values, error: data.error})
          } else {
            console.log(data)
            setCourse(data)
          }
        })
      return function cleanup(){
        abortController.abort()
      }
    }, [match.params.courseId])
    
    const addLesson = (cours) => {
      setCourse(cours)
    }

    const imageUrl = course._id
          ? `/api/courses/photo/${course._id}?${new Date().getTime()}`
          : '/api/courses/defaultphoto'
          if (values.redirect) {
            return (<Redirect to={'/teach/courses'}/>)
          }
          
    console.log(course)
    return(
        <div className={classes.root}>
            <Card className={classes.card}>
            <CardHeader
                  title={course.name}
                  subheader={<div>
                        <Link to={"/user/"+course.instructor._id} className={classes.sub}>By {course.instructor.name}</Link>
                        <span className={classes.category}>{course.category}</span>
                      </div>
                    }
                  action={<>
             {jwt.user && jwt.user._id == course.instructor._id &&
                (<span className={classes.action}>
                  <Link to={"/teach/course/edit/" + course._id}>
                    <IconButton aria-label="Edit" color="secondary">
                      <Edit/>
                    </IconButton>
                  </Link>
                {/* {!course.published ? (<>
                  <Button color="secondary" variant="outlined" onClick={clickPublish}>{course.lessons.length == 0 ? "Add atleast 1 lesson to publish" : "Publish"}</Button>
                  <DeleteCourse course={course} onRemove={removeCourse}/>
                </>) : (
                  <Button color="primary" variant="outlined">Published</Button>
                )} */}
                </span>)
             }
                {/* {course.published && (<div>
                  <span className={classes.statSpan}><PeopleIcon /> {stats.totalEnrolled} enrolled </span>
                  <span className={classes.statSpan}><CompletedIcon/> {stats.totalCompleted} completed </span>
                  </div>
                  )} */}
                
                </>
            }
                />
                <div className={classes.flex} >
                  <CardMedia
                  className={classes.media}
                  image={imageUrl}
                  title={course.name} 
                   />
                   <div className={classes.details}>
                     <Typography variant="body1"
                      className={classes.subheading} >
                        {course.description}
                     </Typography>
                   </div>
                </div>
                <Divider/>
                <div>
                  <CardHeader
                  title={
                    <Typography variant="h6"
                     className={classes.subheading} >
                       Lessons
                    </Typography>
                  }
                  subheader={
                    <Typography className={classes.subheading}
                     variant="body1" >
                       {course.lessons && course.lessons.length} Lessons
                    </Typography>
                  }
                  action={
                    jwt.user?._id == course.instructor._id &&
                       (<span className={classes.action}>
                         <NewLesson courseId={course._id}
                          title={course.name} addLesson={addLesson}/>
                       </span>)
                   }/>
                </div>
            </Card>
        </div>
    )
}


export default Course