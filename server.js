const express = require("express");
const fs = require("fs");
const { request } = require("http");
const path = require("path");
const _ = require("lodash");
const mongoose = require("mongoose");

const setup = require(path.join(__dirname, "server", "setup.js"));



const app = express();
app.use(express.static("public"))

let loadedConfiguration = JSON.parse(fs.readFileSync("configuration.json", "utf8"));
// get configuration and credentials
const configuration = _.cloneDeep(loadedConfiguration)
// derive a safer configuration object
const safeConfiguration = stripSensitiveConfigurationData(loadedConfiguration);

require('dotenv').config({path: path.join(__dirname, configuration.environmentVariablesFileLocation)});

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

function stripSensitiveConfigurationData(loadedConfiguration){
    let newConfiguration = _.cloneDeep(loadedConfiguration);
    delete newConfiguration.environmentVariablesFileLocation;
    return newConfiguration;
}

function checkInitialSetUpProgress(){
    if (!safeConfiguration.projectIsSetUp){
        setup.startSetUp(_.cloneDeep(configuration));
    } else {
        initialize();
    }
}


app.set('view engine', 'ejs');

app.get("/", (request, response) => {
    response.render("pages/index", {configuration: safeConfiguration}); 
});

app.get("/login", (request, response) => {
    response.render("pages/login", {configuration: safeConfiguration}); 
});

app.get("/signup", (request, response) => {
    response.render("pages/signup", {configuration: safeConfiguration}); 
});

app.get("/chatboard", (request, response) => {
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

app.get("/update", (request, response) => {
    response.render("pages/updates", {configuration: safeConfiguration}); 
});

app.get("/studymaterial-menu", (request, response) => {
    response.render("pages/studymaterial-menu", {configuration: safeConfiguration}); 
});

app.listen(configuration.port, () => {
    console.log(`App listening on port ${configuration.port}`);
    checkInitialSetUpProgress();

});
