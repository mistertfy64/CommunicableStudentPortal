// insert modules here
const express = require("express");
const fs = require("fs");
const { request } = require("http");
const path = require("path");
const _ = require("lodash");


const app = express();
app.use(express.static("public"))

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

app.get("/chat-board", (request, response) => {
    response.render("pages/chatboard-menu"); 
});

app.listen(configuration.port, () => {
    console.log(`App listening on port ${configuration.port}`);
});