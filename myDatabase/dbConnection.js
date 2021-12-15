const mongoose = require("mongoose");

//connection with the database called gharmai
mongoose.connect("mongodb://127.0.0.1:27017/gharmai", {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
});
