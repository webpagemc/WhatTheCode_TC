const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const tokenSign = async(userProps)=>{

    const sign = jwt.sign(
        {
            _id:userProps._id,
            usuario:userProps.usuario,
            role:userProps.role
        },JWT_SECRET,
        {
            expiresIn:"12h"
        }
    )
    return sign
}

const verifyToken = async(tokenJWT)=>{

    return jwt.verify(tokenJWT,JWT_SECRET)

}

module.exports ={tokenSign,verifyToken};