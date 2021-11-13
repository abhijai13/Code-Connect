import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { getPosts } from '../../actions/post'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'

const Posts = ({getPosts, post:{posts, loading}, auth:{isAuthenticated}}) => {

    useEffect(() =>{
        getPosts()
    }, [])

    return loading ? <Spinner/> : (
        <div>
            <h1 className='large' style={{color:'#17a2b8'}}>Posts</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Welcome to the Community
            </p>
            {isAuthenticated && (<PostForm />)}
            <div>
                {posts.map(post => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>
        </div>
    )
}

Posts.propTypes = {
    getPosts:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth
})

export default connect(mapStateToProps, {getPosts})(Posts)
