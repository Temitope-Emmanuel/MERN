import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import {create} from './api-enrollment'
import {isAuthenticated} from './../auth/auth-helper'
import {Redirect} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    form: {
        minWidth: 500
    }
}))


const Enroll = (props) => {
    const [values,setValues] = useState({
        enrollmentId:'',
        error:'',
        redirect:false
    })
    const clickEnroll = () => {
        const jwt = isAuthenticated()
        create({
            courseId:props.courseId,
            token:jwt.token
        }).then((data) => {
            if(data.error){
                console.log("error",data.error)
                setValues({...values,error:data.error})
            }else{
                console.log(data)
                setValues({...values,enrollmentId:data._id,redirect:true})
            }
        })
    }

    if(values.redirect){
        return (
            <Redirect to={`/learn/${values.enrollmentId}`} />
        )
    }
    return (
        <Button variant="contained" 
         color="secondary" onClick={clickEnroll}>
             Enroll
        </Button>
    )
}

Enroll.propTypes = {
    courseId:PropTypes.string.isRequired
}

export default Enroll