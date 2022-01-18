const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("./myDatabase/dbConnection");
const userModel = require("./route/userRoute");
const workerModel = require("./route/workerRoute");
const serviceModel = require("./route/serviceRoute");
const categoryModel = require("./route/categoryRoute");

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

app.use(workerModel);
app.use(userModel);
app.use(categoryModel);
app.use(serviceModel);
// app.use(movieModel);
// app.use(reviewModel);

//configuring the server
app.listen(90);