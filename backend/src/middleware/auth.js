require('dotenv').config()
const jwt = require('jsonwebtoken')
const secretkey = process.env.SECRETKEY


const authCheck = (req,res,next) => {

    const bearerHeader = req.headers['authorization']

    if(typeof bearerHeader !== 'undefined'){

        const bearertoken  = bearerHeader.split(' ')[1]

        jwt.verify(bearertoken,secretkey,(error,decode)=>{
            if(error){
                return res.status(401).json({ message: "Access denied: Invalid or expired token" });
            }

            req.user = decode
            req.token = bearertoken

            next()
        })
    }else{
        return res.status(403).json({ message: "Access denied: Token not provided" });
    }  
}

const CheckAdmin = async(req,res,next)=>{
    const userId  = req.user

    if(userId.role !== 'admin'){
        return res.status(403).json({message:"Access denied: Admin only"})
    }
    next()
}

module.exports = {
    authCheck,
    CheckAdmin
}