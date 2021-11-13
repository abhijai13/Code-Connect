const express = require('express')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Post = require('../../models/Post')
const auth = require('../../middleware/auth')
const {check, validationResult} = require('express-validator')
const router = express.Router();


//Route:    POST api/posts
//access:   private
router.post('/',[auth, [
    check('text','Text is required').not().isEmpty()
]],
    async (req,res) => {
        const errors = validationResult(req)
        // console.log(req.body)
        if(!errors.isEmpty()){
            // console.log(errors)
            return res.status(400).json({errors: errors.array()})
        }

        try{
            const user = await User.findById(req.user.id).select('-password')

            const newPost = {
                text : req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            }

            const post = new Post(newPost) 
            await post.save()

            res.json(post)
        }catch(err){
            console.error(err.message)
            res.status(500).json('Server Error')
        }
    }
)

//Route:    Get api/posts
//desc:     get all posts
//access:   private

router.get('/', auth, async (req, res) =>{
    try {
        const posts = await Post.find().sort({date: -1})
        res.json(posts)
    }catch(err){
        console.error(err.message)
        res.status(500).json('Server Error')
    }
})


//Route:    Get api/posts/:id
//desc:     get  posts by id
//access:   private

router.get('/:id',auth, async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post)
            return res.status(404).json('Post not found')

        res.json(post)
    }catch(err){
        console.error(err.message)
        if(err.kind === 'ObjectId')
            return res.status(400).json('Post not found')
        res.status(500).json('Server Error')
    }
})


//Route:    DELETE api/posts/:id
//desc:     Delete posts
//access:   private

router.delete('/:id',auth, async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id)

        if(!post)
            return res.status(404).json('Post not found')

        if(post.user.toString() !== req.user.id)
            return res.status(401).json('User not authorized')
        
        await post.remove()

        res.json({msg : "Post removed"})
    }catch(err){
        console.error(err.message)
        if(err.kind === 'ObjectId')
            return res.status(400).json('Post not found')
        res.status(500).json('Server Error')
    }
})

//Route:    PUT api/posts/like/:id
//desc:     like a post
//access:   private

router.put('/like/:id',auth, async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post)
            return res.status(404).json('Post not found')
        
        const Idx = post.likes.map(item => item.user.toString()).indexOf(req.user.id.toString())
        // console.log(Idx)

        if(Idx>-1)
        {
            // return res.status(400).json({msg:"post already liked"})
            post.likes.splice(Idx, 1)
        }
        else {
            post.likes.unshift({user: req.user.id})
        
        }
        await post.save()
        

        
        res.json(post.likes)
    }catch(err){
        console.error(err.message)
        if(err.kind === 'ObjectId')
            return res.status(400).json('Post not found')
        res.status(500).json('Server Error')
    }
})


//Route:    POST api/posts/comment/:id
//desc:     Post comment on posts by id
//access:   private

router.post('/comment/:id',[auth, [
    check('text','Comment box is empty').not().isEmpty()
]], 
    async (req, res) =>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        

        try {
            const post = await Post.findById(req.params.id)
            if(!post)
                return res.status(404).json('Post not found')
            
            const user = await User.findById(req.user.id)
            const newComment = {
                user: req.user.id,
                text: req.body.text,
                avatar: user.avatar,
                name: user.name
            }

            post.comments.unshift(newComment)

            await post.save()

            res.json(post.comments)
        }catch(err){
            console.error(err.message)
            if(err.kind === 'ObjectId')
                return res.status(400).json('Post not found')
            res.status(500).json('Server Error')
        }
    }
)

//Route:    Delete api/posts/comment/:id
//desc:     Delete comment on posts by id
//access:   private

router.delete('/comment/:id/:cmt_id',auth, async (req, res) =>{
        try {
            const post = await Post.findById(req.params.id)
            if(!post)
                return res.status(404).json('Post not found')
            
            const removeIdx = post.comments.map(item => item.id).indexOf(req.params.cmt_id)
            if(removeIdx === -1)
                return res.status(404).json({msg: "Comment doesnot exist"})
            
            if(post.comments[removeIdx].user.toString() === req.user.toString())
                return res.status(400).json({msg: "Unauthorized to delete comment"})
            
            post.comments.splice(removeIdx,1)

            await post.save()

            res.json(post.comments)
        }catch(err){
            console.error(err.message)
            if(err.kind === 'ObjectId')
                return res.status(400).json('Post not found')
            res.status(500).json('Server Error')
        }
    }
)

module.exports = router