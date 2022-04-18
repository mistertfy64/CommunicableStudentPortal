// insert modules here
const express = require("express");
const fs = require("fs");
const { request } = require("http");
const path = require("path");

const app = express()
// get configuration and credentials
const configuration = JSON.parse(fs.readFileSync("configuration.json", "utf8"));

require('dotenv').config({path: path.join(__dirname, configuration.environmentVariablesFileLocation)});


app.set('view engine', 'ejs');

app.get("/", (request, response) => {
    response.render("pages/index"); 
});

app.get("/login", (request, response) => {
    response.render("pages/login"); 
});


app.listen(configuration.port, () => {
    console.log(`App listening on port ${configuration.port}`);
});