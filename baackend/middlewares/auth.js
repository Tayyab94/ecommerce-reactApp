const jwt = require("jsonwebtoken")

const verifyToken=async (req, res, next)=>{
    if(!req.headers.authorization) {
        return res.status(403).json({msg:"Not Authorize User, No token"})
    }
    if(req.headers.authorization.startsWith("Bearer ")){
        const token = req.headers.authorization.split(" ")[1] //Get the 2nd el which is token  itself
        jwt.verify(token, process.env.JWT_SEC,(err,data)=>{
            if(err){
                return res.status(403).json({msg:"Wrong or Expire token"})
            }
            else{
                req.user = data
                next()
            }
        })
    }
}

module.exports= verifyToken