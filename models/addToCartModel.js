const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    email: { 
        type: String,
        required: true,
        match: /.+\@.+\..+/,
    },
    password:{
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default:""
    },
    profile:{
        type: String
    },
    // Cart Array of ObjectID
    cart:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }
    ],
})
userSchema.methods.addToCart = async function(itemId){
    const updatedCart = [...this.cart]
    const itemIndex = updatedCart.findIndex(
        item => {
            return (item.toString() === itemId)
        }
    )
    if(itemIndex === -1){
        updatedCart.push(itemId)
        this.cart = updatedCart
        await this.save()
        return true
    }
    return false
}
userSchema.methods.deleteFromCart = async function(itemId){
    const updatedCart = [...this.cart]
    const itemIndex = updatedCart.findIndex(
        item => {
            return (item.toString() === itemId)
        }
    )
    if(itemIndex !== -1){
        updatedCart.splice(itemIndex,1)
        this.cart = updatedCart
        await this.save()
        return true
    }
    return false
}
module.exports = mongoose.model('User',userSchema)