const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ['Salon for Women', 'Salon for Men', 'Plumber', "Electricians", "Cleaning & Disinfection", "Carpenter", "Men Therapy", "Women Therapy"],
        default: 'Salon for Women'
    },
    category_pic: {
        type: String,
    }
});

const Categories = mongoose.model('Category', categorySchema);

module.exports = Categories;