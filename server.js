const express = require("express");
const fs = require("fs");
const { request } = require("http");
const path = require("path");
const _ = require("lodash");
const mongoose = require("mongoose");

const configuration = require("./configuration.js");

const setup = require(path.join(__dirname, "server", "setup.js"));



const app = express();
app.use(express.static("public"))

configuration.initialize();
require('dotenv').config({path: path.join(__dirname, configuration.configuration.environmentVariablesFileLocation)});

app.set('view engine', 'ejs');

function initialize(){
    
mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
}

mongoose.connection.on("connected", () => {
    console.log("Successfully connected to database.");
});



function checkInitialSetUpProgress(){
    if (!configuration.safeConfiguration.applicationIsSetUp){
        setup.startSetUp(_.cloneDeep(configuration));
    } else {
        initialize();
    }
}

require("fs").readdirSync(require("path").join(__dirname, "routes")).forEach((file) => {
    app.use(require("./routes/" + file));
});


<<<<<<< HEAD
app.get("/signup", (request, response) => {
    response.render("pages/signup", {configuration: safeConfiguration}); 
});

app.get("/chatboard-menu", (request, response) => {
    response.render("pages/chatboard-menu", {configuration: safeConfiguration}); 
});

app.get("/about", (request, response) => {
    response.render("pages/about", {configuration: safeConfiguration}); 
});

app.get("/events", (request, response) => {
    response.render("pages/event", {configuration: safeConfiguration}); 
});

app.get("/contact", (request, response) => {
    response.render("pages/contact", {configuration: safeConfiguration}); 
});

app.get("/leaderboard", (request, response) => {
    response.render("pages/leaderboard", {configuration: safeConfiguration}); 
});

app.get("/updates", (request, response) => {
    response.render("pages/updates", {configuration: safeConfiguration}); 
});

app.get("/studymaterial-menu", (request, response) => {
    response.render("pages/studymaterial-menu", {configuration: safeConfiguration}); 
});

app.get("/chatboard-prototype", (request, response) => {
    response.render("pages/chatboard-prototype", {configuration: safeConfiguration}); 
});

app.listen(configuration.port, () => {
    console.log(`App listening on port ${configuration.port}`);
=======
app.listen(configuration.configuration.port, () => {
    console.log(`App listening on port ${configuration.configuration.port}`);
>>>>>>> e8752b8035c21bdbd5aedcb34e07a080d201e451
    checkInitialSetUpProgress();

});
