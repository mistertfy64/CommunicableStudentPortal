// insert modules here
const express = require("express");
const fs = require("fs");
const { request } = require("https");
const path = require("path");
const _ = require("lodash");
const helmet = require('helmet');

const app = express();
app.use(express.static("public"))
app.use(helmet());

let loadedConfiguration = JSON.parse(fs.readFileSync("configuration.json", "utf8"));
// get configuration and credentials
const configuration = _.cloneDeep(loadedConfiguration)
// derive a safer configuration object
const safeConfiguration = stripSensitiveConfigurationData(loadedConfiguration);

require('dotenv').config({path: path.join(__dirname, configuration.environmentVariablesFileLocation)});


function stripSensitiveConfigurationData(loadedConfiguration){
    let newConfiguration = _.cloneDeep(loadedConfiguration);
    delete newConfiguration.environmentVariablesFileLocation;
    return newConfiguration;
}


app.set('view engine', 'ejs');

app.get("/", (request, response) => {
    response.render("pages/index"); 
});

app.get("/login", (request, response) => {
    response.render("pages/login"); 
});

app.get("/chatboard", (request, response) => {
    response.render("pages/chatboard-menu"); 
});

app.get("/about", (request, response) => {
    response.render("pages/about"); 
});

app.get("/event", (request, response) => {
    response.render("pages/event"); 
});

app.get("/contact", (request, response) => {
    response.render("pages/contact"); 
});

app.get("/update", (request, response) => {
    response.render("pages/update"); 
});

app.get("/study-material", (request, response) => {
    response.render("pages/studymaterial-menu"); 
});

app.listen(configuration.port, () => {
    console.log(`App listening on port ${configuration.port}`);
});