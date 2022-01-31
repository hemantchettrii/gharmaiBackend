const mongoose = require("mongoose");

//connection with the database called gharmai
// mongoose.connect("mongodb://127.0.0.1:27017/gharmai", {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
// });

mongoose.connect("mongodb://127.0.0.1:27017/gharmai", {
    // useCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log('Connected to MongoDB!!!')
})

// const URI = "mongodb://127.0.0.1:27017/gharmaiBackend";

// mongoose.connect(
//     URI,
//     {
//         useNewUrlParser: true,
        
//         useUnifiedTopology: true,
//     },
//     (err) => {
//         if (err) throw err;
//         console.log("Connected to MongoDB!!!");
//     }
// );