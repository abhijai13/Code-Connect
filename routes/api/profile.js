const express = require('express')
const request = require('request')
const config = require('config')
// const multer = require('multer')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const auth = require('../../middleware/auth')

const {check, validationResult} = require('express-validator')

// const upload = multer({dest: 'uploads/'})

const router = express.Router();


//Route:    api/profile/me
//desc:     get current user's profile
//access:   private
router.get('/me', auth ,async (req,res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user',['name', 'avatar'])
        
        if(!profile)
            return res.status(400).json("There is no profile for this user")
        
        res.json(profile)
    
    }catch(err){
        console.error(err.message)
        res.status(500).json('Server Error')
    }
})

//Route:    api/profile
//desc:     create/update a user profile
//access:   private

router.post('/', [auth, [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills is required').not().isEmpty()
    ], ], 
    async(req,res) =>{
        const errors = validationResult(req)
        // console.log(req.body)
        if(!errors.isEmpty()){
            // console.log(errors)
            return res.status(400).json({errors: errors.array()})
        }



        const {
            company, 
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body

        const profileFields = {}

        profileFields.user = req.user.id
        if(company) profileFields.company = company
        if(website) profileFields.website = website
        if(location) profileFields.location = location
        if(bio) profileFields.bio = bio
        if(status) profileFields.status = status
        if(githubusername) profileFields.githubusername = githubusername
        if(skills) {
            profileFields.skills = skills.toString().split(',').map(skill => skill.trim())
        }

        //we have to create a object named social otherwise it cannot create a field in an unnamed object
        profileFields.social = {}
        if(twitter) profileFields.social.twitter = twitter
        if(youtube) profileFields.social.youtube = youtube
        if(facebook) profileFields.social.facebook = facebook
        if(instagram) profileFields.social.instagram = instagram
        if(linkedin) profileFields.social.linkedin = linkedin

        try {
            let profile = await Profile.findOne({user: req.user.id})

            if(profile){
                //update
                profile = await Profile.findOneAndUpdate(
                    {user: req.user.id}, 
                    {$set: profileFields}, 
                    {new: true}
                )

                return res.json(profile)
            }

            //create
            profile = new Profile(profileFields)
            await profile.save()
            res.json(profile)

        } catch (err){
            console.error(err)
            console.status(500).json("Server Error")
        }

    }
)


//Route:    api/profile
//desc:     get all profile
//access:   public

router.get('/', async (req, res) => {
    try{
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)

    }catch(err){
        console.error(err.message)
        res.status(500).json('Server Error')
    }
})

//Route:    api/profile/user/:user_id
//desc:     get all profile
//access:   public

router.get('/user/:user_id', async (req, res) => {
    try{
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar'])
        if(!profile)
            return res.status(400).json('No profile exists')
        res.json(profile)

    }catch(err){
        console.error(err.message)

        // whenever we enter a profile id longer/shorter than the alloted then the findOne function will encounter 
        // an error thus invoking the catch block. for invalid profile id, we will use below
        if(err.kind === 'ObjectId')
            return res.status(400).json('No profile exists')
        res.status(500).json('Server Error')
    }
})


//Route:    Delete api/profile
//desc:     delete profile
//access:   private

router.delete('/',auth,  async (req, res) => {
    try{
        
        //remove profile
        await Profile.findOneAndRemove({user: req.user.id})
        //remove user 
        await User.findOneAndRemove({_id: req.user.id})
        res.json({msg:'User Deleted'})

    }catch(err){
        console.error(err.message)
        res.status(500).json('Server Error')
    }
})

//Route:    put api/profile/experience
//desc:     add exp
//access:   private

router.put('/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'Starting date is required').not().isEmpty()
]], 
    async (req,res) =>{
        const errors = validationResult(req)
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()})
        
            const {
                title,
                company,
                location,
                from,
                to,
                current,
                description
            } = req.body

            const newExp = {
                title,
                company,
                location,
                from,
                to,
                current,
                description
            }

            try {
                const profile = await Profile.findOne({user: req.user.id})
                profile.experience.unshift(newExp)
                await profile.save()
                res.json(profile)
                
            }catch(err){
                console.error(err)
                res.status(500).json("Server Error")
            }
    }
)

//Route:    put api/profile/experience/:id
//desc:     delete exp
//access:   private

router.delete('/experience/:exp_id', auth, async (req,res) =>{
    try {
        const profile = await Profile.findOne({user: req.user.id})

        const removeIdx = profile.experience.map(item => item.id).indexOf(req.params.exp_id)

        profile.experience.splice(removeIdx, 1)

        await profile.save()

        res.json(profile)
    }catch(err){
        console.error(err)
        res.status(500).json("Server Error")
    }
})


//Route:    put api/profile/education
//desc:     add edu
//access:   private

router.put('/education', [auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('from', 'Starting date is required').not().isEmpty(),
    check('fieldofstudy', 'Field of Study is required').not().isEmpty()
]], 
    async (req,res) =>{
        const errors = validationResult(req)
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()})
        
            const {
                school,
                degree,
                fieldofstudy,
                from,
                to,
                current,
                description
            } = req.body

            const newEdu = {
                school,
                degree,
                fieldofstudy,
                from,
                to,
                current,
                description
            }

            try {
                const profile = await Profile.findOne({user: req.user.id})
                profile.education.unshift(newEdu)
                await profile.save()
                res.json(profile)
                
            }catch(err){
                console.error(err)
                res.status(500).json("Server Error")
            }
    }
)

//Route:    put api/profile/experience/:id
//desc:     delete exp
//access:   private

router.delete('/education/:edu_id', auth, async (req,res) =>{
    try {
        const profile = await Profile.findOne({user: req.user.id})

        const removeIdx = profile.education.map(item => item.id).indexOf(req.params.edu_id)

        profile.education.splice(removeIdx, 1)

        await profile.save()

        res.json(profile)
    }catch(err){
        console.error(err)
        res.status(500).json("Server Error")
    }
})

//Route:    GET api/profile/github/:username
//desc:     get user repos from github
//access:   public

router.get('/github/:username', async (req,res)=>{
    try{
        const options = {
            uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&
            client_id=${config.get('githubclientid')}&client_secret=${config.get('githubsecret')}`,
            method:'GET',
            headers: {'user-agent': 'node.js'}
        }
        request(options, (error, response, body)=>{
            if(error) console.error(error)
            if(response.statusCode !== 200)
                return res.status(404).json('No Github Profile found')
            res.json(JSON.parse(body))
        })
    }catch(err){
        console.error(err)
        res.status(500).json("Server Error")
    }
})

module.exports = router