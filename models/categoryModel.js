const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
    },
    category_pic: {
        type: String,
    }
});

const Categories = mongoose.model('Category', categorySchema);

module.exports = Categories;