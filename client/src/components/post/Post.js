import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost } from '../../actions/post'
import PostItem from '../posts/PostItem'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = ({getPost, post:{loading, post}, match}) => {  //match for id in url

    useEffect(()=>{
        getPost(match.params.id)
    }, [getPost])
    return loading || post === null? <Spinner /> : (
        <div>
            <Link to='/posts' className='btn'> Back To Posts</Link>
            <PostItem showActions={false} post={post} />
            <CommentForm postId={post._id} />
            <div className='comment'>
                {post.comments.map(comment => (<CommentItem key={comment._id} comment={comment} postId={post._id} />))}
            </div>
        </div>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, {getPost})(Post)
