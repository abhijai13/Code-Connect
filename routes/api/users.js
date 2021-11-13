const express = require('express')
const router = express.Router();
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')

const User = require('../../models/User')

//Type:     POST registration
//Route:    api/users
//access:   public
router.post('/',
    [
        check('name','provide a name').not().isEmpty(),
        check('email','Please include a valid E-Mail').isEmail(),
        check('password','Please provide a password with atleast 8 characters').isLength({min:8})
    ] , 

    async(req,res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        
        console.log(req.body)

        const {name, email, password} = req.body

        try {
            let user = await User.findOne({email})
            if(user){
                return res.status(400).json({errors : [{msg:"User already exists"}]})
            }
            const avatar = gravatar.url(email,{
                s:"200",
                r:"pg",
                d:"mm"
            })
            
            user = new User({
                name,
                email,
                avatar,
                password
            })

            const salt = await bcrypt.genSalt(10)

            user.password = await bcrypt.hash(password, salt)

            await user.save()

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload, 
                config.get('jwt-secret'),
                {expiresIn:36000},
                (err,token)=>{
                    if(err) throw err
                    res.json({token})
                })

        } catch(err){
            console.log(err)
            res.status(500)
        }
    }
)

module.exports = router