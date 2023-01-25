const verifyToken=require("../middlewares/auth")
const Product = require("../models/Product")

const productController= require("express").Router()

//get all product

productController.get("/", async(req, res)=>{
    try {
        let products
        products=await Product.find({})

        if(!products.length){
            return res.status(404).json({msg:"No Product"})
        }

        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

productController.get("/:id",async(req,res)=>{
    try {
        // console.log(req.params.id)
        let singleProduct
        singleProduct= await Product.findById(req.params.id)
        if(!singleProduct){
            return res.status(404).json({msg:"No Product found with this id"})
        }
        return res.status(200).json(singleProduct)
        ;

    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// verifyToken (Use this function to validate the author)
productController.post("/create",verifyToken, async(req, res)=>{
    try {
       
        const product=await Product.create({...req.body})
        await product.save()
        return res.status(201).json(product)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

module.exports =productController