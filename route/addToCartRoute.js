const { req, res } = require("express");
const express = require("express");
const router = new express.Router();
// const subscriptionModel = require("../models/subscriptionModel");
const cartModel = require("../models/cartModel");
const verifyUser = require("../middleware/auth");

// CART
router.get("/cart", auth.verifyUser, async (req,res) => {
    try{
        const _id = req.user._id
        const user = await User.findOne(_id).populate({path: "cart"})
        res.json({data: user.cart})
    } catch (error) {
        console.log(error)
        res.json({message:"Something went wrong"})
    }
    res.end()
})

router.post("/addtocart/:bookId", auth.verifyUser, async (req,res) =>{
    try{
        const _id = req.user._id
        const user = await User.findById(_id)
        const bookId = req.params.bookId
        const isAdded = await user.addToCart(bookId)
        const book = await Book.findById(bookId)
        if(isAdded){
            res.json({message:"Book Added"})
        }
        else{
            res.json({message:"Book Already On Cart"})
        }
    } catch (error) {
        console.log(error)
        res.json({message:"Something went wrong"})
    }
    res.end()
})

router.delete("/deletefromcart/:bookId", auth.verifyUser, async (req,res) => {
    try {
        const _id = req.user._id
        const user = await User.findById(_id)
        const bookId = req.params.bookId
        const isDeleted = await user.deleteFromCart(bookId)
        const book = await Book.findById(bookId)
        if (isDeleted) {
            res.json({message:"Something went wrong"})
        }
        else {
            res.json({message: "Book Added"})
        }
    }
    catch (error) {
        console.log(error)
        res.json({message:"Something went worng"})
    }
    res.end()
})