const uploadController= require("express").Router()

const multer = require("multer")
const verifyToken = require("../middlewares/auth")

const storage= multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,"public/images")
    },
    filename:(req, file, cb)=>{
        cb(null, req.body.filename)
    }
})

const upload= multer({
    storage:storage
})

uploadController.post("/firstImg", upload.single("firstImage"), async(req, res)=>{
    try {
        return res.status(200).json({msg:"Image successfully uploaded"})
    } catch (error) {
        console.log(error.message)
    }
})



uploadController.post("/secondImg", upload.single("lastImage"), async(req, res)=>{
    try {
        return res.status(200).json({msg:"Image successfully uploaded"})
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = uploadController