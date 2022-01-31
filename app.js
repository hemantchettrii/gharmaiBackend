const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("./myDatabase/dbConnection");
const userRoute = require("./route/userRoute");
const workerRoute = require("./route/workerRoute");
const serviceRoute = require("./route/serviceRoute");
const categoryRoute = require("./route/categoryRoute");
const adminRoute = require("./route/adminRoute");

const bodyParser = require("body-parser");

//load express engine
const app = express();
app.use(cors());

const path = require("path");
const publicDir = path.join(__dirname, "category");
app.use(express.static(publicDir));         
// const publicDir = path.join(__dirname, "movies");
// app.use(express.static(publicDir));

// const publicDir2 = path.join(__dirname, "profileImage");
// app.use(express.static(publicDir2));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(workerRoute);
app.use(userRoute);
app.use(categoryRoute);
app.use(serviceRoute);
app.use(adminRoute);


// app.use(movieModel);
// app.use(reviewModel);

//configuring the server
app.listen(90);