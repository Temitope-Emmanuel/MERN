import React from "react"
import Button from "@material-ui/core/Button"
import PropTypes from "prop-types"
import {follow,unfollow} from "./api-user"

const FollowProfileButton = (props) => {
    const followClick = () => {
        props.onButtonClick(follow)
    }
    const unFollowClick = () => {
        props.onButtonClick(unfollow)
    }
    return(
        <div>
            {
            props.following ? 
            (
                <Button variant="contained" color="secondary"
                onClick={unFollowClick}>
                    Unfollow
                </Button>
            ) : (
                <Button variant="contained" color="primary"
                 onClick={followClick}>
                     Follow
                </Button>
            )
            }
        </div>
    )
}

FollowProfileButton.propTypes = {
    following:PropTypes.bool.isRequired,
    onButtonClick:PropTypes.func.isRequired
}

export default FollowProfileButton