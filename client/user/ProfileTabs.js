import React, {useState} from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import FollowGrid from "./FollowGrid"
import PostList from "../post/PostList"

const ProfileTabs = (props) => {
    const [tab,setTab] = React.useState(1)
    const handleTabChange = (event,value) => {
        setTab(value)
    }
    console.log(props)
    return(
        <div>
            <AppBar position="relative">
                <Tabs
                 onChange={handleTabChange}
                 indicatorColor="primary"
                 variant="fullWidth"
                 value={tab} >
                     <Tab label="Posts" />
                     <Tab label="Following" />
                     <Tab label="Followers" />
                </Tabs>
            </AppBar>
            {tab === 0 && 
            <TabContainer>
                <PostList 
                 removeUpdate={props.removePostUpdate}
                 post={props.posts}/>
                </TabContainer>}
            {tab === 1 && 
            <TabContainer>
                <FollowGrid people={props.user.following}/>
            </TabContainer>}
            {tab === 2 && 
            <TabContainer>
                <FollowGrid people={props.user.followers}/>
            </TabContainer>}
        </div>
    )
}

ProfileTabs.propTypes = {
    user:PropTypes.object.isRequired,
    removePostUpdate:PropTypes.func.isRequired,
    user:PropTypes.object.isRequired
}

const TabContainer = (props) => {
    return(
        <Typography component="div" style={{padding:8*2}} >
            {props.children}
        </Typography>
    )
}
export default ProfileTabs