const express = require('express');
const app = express();
const dotenv = require("dotenv");
const errorHandler = require("./utils/errorResponse")
const routes = require("./routes/index.route")
const path = require("path");
const config = require("../config/db")
const bodyparser = require('body-parser')
// dot env
dotenv.config({
    path: "./config/config.env"
})
// connectDB();
config

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");

app.enable("trust proxy");
console.log(publicDirPath)
//EJS
app.set("view engine", "ejs");
app.set("view options", {
    layout: false,
});

// Set Public folder
app.use(express.static(publicDirPath));

//Set Request Size Limit
app.use(
    express.json({
        limit: "50mb",
    })
);
app.use(
    express.urlencoded({
        extended: true,
        limit: "50mb",
    })
);

// app.use('/v1', routes)
app.use("/", routes);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log("server connected")
})



