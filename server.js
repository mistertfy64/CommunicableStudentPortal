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
require('dotenv').config({path: path.join(__dirname, configuration.unsafeConfiguration.environmentVariablesFileLocation)});

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

app.listen(configuration.unsafeConfiguration.port, () => {
    console.log(`App listening on port ${configuration.unsafeConfiguration.port}`);
    checkInitialSetUpProgress();

});
