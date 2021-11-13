import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../actions/post'

const CommentForm = ({postId, addComment}) => {

    const [text, setText] = useState('')
    return (
        <div class="post-form">
            <div class="post-form-header " style = {{backgroundColor: '#17a2b8'}}>
                <h3 style={{color:'white'}}>Leave a Comment</h3>
            </div>
            <form class="form my-1" onSubmit = {e => {
                e.preventDefault()
                addComment(postId,{text})
                setText('')
            }}>
                <textarea cols="30" rows="5" value={text} onChange = {e => setText(e.target.value)} placeholder="Create a Comment"></textarea>
                <input type="submit" value="Submit" class="btn btn-dark my-1" />
            </form>
        </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired
}

export default connect(null, {addComment})(CommentForm)
