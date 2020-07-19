import React from 'react'
import PropTypes from 'prop-types'
import Post from './Post'


const PostList = (props) => (
    <div style={{marginTop:'24px'}}>
        {props.post.map((item,i) => (
            <Post post={item}
             key={i} onRemove={props.removeUpdate} />
        ))}
    </div>
)

PostList.propTypes = {
    removeUpdate:PropTypes.func.isRequired,
    post:PropTypes.array.isRequired
}

export default PostList