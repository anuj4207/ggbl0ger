const jwt = require('jsonwebtoken')
const UnauthenticatedError = require('../errors/unauthenticated')
const authenticationMiddleware = async(req,res,next)=>{
    const authHeader = req.headers.authorization
    console.log(req.headers);
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('No token provided')
    }
    const token = authHeader.split(' ')[1]
    console.log("token",token);
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        const {_id,username} = decode
        req.user = {_id,username}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access token')
    }
}
module.exports = authenticationMiddleware