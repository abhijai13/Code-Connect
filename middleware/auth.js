const jwt = require('jsonwebtoken')
const config = require('config')


//Decodes the incoming token and verify whether it is expired or not
//the token contains only the user.id that is created by the mongodb
module.exports = function (req,res,next) {
    const token = req.header('x-auth-token')
    if(!token)
        return res.status(401).json({msg: 'No token. Authorisation denied'})

    try{
        let decoded = jwt.verify(token, config.get('jwt-secret'))
        // console.log(req.body)
        req.user = decoded.user
        next();
    } catch (err){
        res.status(401).json({msg: 'Token is not valid'})
    }
}