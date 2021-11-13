import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { addLike, deletePost } from '../../actions/post'

const PostItem = ({auth, post:{_id, text, name, avatar, user, likes, comments, date}, addLike, deletePost, showActions}) => {

    return (
        <div>
            <div class="post bg-white my-1 p-1">
            <div>
              <Link to={`/profile/${user}`}>
                <img
                  class="round-img"
                  src={avatar}
                  alt=""
                />
                <h4>{name}</h4>
              </Link>
            </div>

            <div>
              <p class="my-1">
                {text}
              </p>
              <p className='post-date' style={{color:'grey'}}> Posted on <Moment format='YYYY/MM/DD'>{date}</Moment></p>
              {showActions && (<Fragment> 
                <button class="btn" onClick={e=>addLike(_id)}>
                    <i class="fas fa-thumbs-up"></i>{' '} {likes.length>0 && (<span className='comment-count'>{likes.length}</span>)}
                </button>
                <button class="btn">
                    <i class="fas fa-thumbs-down"></i>
                </button>
                <Link to={`/posts/${_id}`} class="btn btn-primary">
                    Discussion{' '} {comments.length>0 && (<span className='comment-count'>{comments.length}</span>)}
                </Link>

                {!auth.loading && user===auth.user._id  && (
                    <button type='button' className='btn btn-danger' onClick={e => deletePost(_id)}>
                    <i className='fas fa-times'/>
                    </button>
                )}
              </Fragment>)}
              
              
            </div>
          </div>
        </div>
    )
}

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps,{addLike, deletePost})(PostItem)
