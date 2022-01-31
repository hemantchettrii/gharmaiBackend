const express = require("express");
const router = new express.Router();

const upload = require("../middleware/category.fileUpload");

const verifyUser = require("../middleware/auth");
const Categories = require("../models/categoryModel");

/** insert code **/
router.post('/category/insert',  upload.single('categoryImage'),  function (req, res) {
    console.log(req.body)
    const category = req.body.category;
    const categoryImage = req.body.filename;

    /*** INSERT CODE HERE ***/
    const data = new Categories({
        category: category,
        category_pic: categoryImage,
    });
    data
        .save()
        .then(function(result) {
            res.status(201).json({ message: "Category Inserted!" });
        })
        .catch(function(err) {
            res.status(500).json({ message: err });
        });
})

/**** UPDATING CATEGORY ****/
router.put("/category/update", verifyUser.verifyUser, function (req, res) {
    /*** UPDATE CODE HERE ***/
    const id = req.body.id;
    const category = req.body.category;
    Categories.updateOne({ _id: id }, { category: category})
        .then(function (result) {
            res.status(201).json({ message: "Category updated" });
        })
        .catch(function (err) {
            res.status(500).json({ message: err });
        });
});
/**** END OF UPDATING MOVIE ****/

/********** DISPLAY SINGLE ITEM *********/
router.get("/category/single/:id", function (req, res) {
    const id = req.params.id;
    Categories.findById(id)
        .then(function (data) {
        res.status(200).json(data);
        })
        .catch(function (err) {
        res.status(500).json({});
        });
});
/********** END OF DISPLAY SINGLE ITEM *********/

router.delete("/category/remove/:id", verifyUser.verifyUser, function (req, res) {
    /*** DELETE CODE HERE ***/
    /**** const id = req.body.id; ****/ // ---> if it comes from form
    const id = req.params.id; // ---> if it comes from url

    Categories.deleteOne({ _id: id })
        .then(function (result) {
        res.status(201).json({ message: "Category deleted" });
        })
        .catch(function (err) {
        res.status(500).json({ message: err });
        });
});

//display all the items in survice
router.get("/category/showall", verifyUser.verifyUser, function (req, res) {
    Categories.find()
        .then(function (data) {
        res.status(201).json({ success: true, data: data });
        })
        
        .catch(function (err) {
        res.status(500).json({ message: err });
        });
});

module.exports = router;