const express = require("express");
const fs = require("fs");
const { request } = require("http");
const path = require("path");
const _ = require("lodash");
const mongoose = require("mongoose");
const csurf = require('csurf');
const http = require("http");

const configuration = require("./server/configuration.js");

const setup = require(path.join(__dirname, "server", "setup.js"));

const log = require("./server/core/log.js");


const app = express();
app.use(express.static("public"))
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

configuration.initialize();
require('dotenv').config({path: path.join(__dirname, configuration.unsafeConfiguration.environmentVariablesFileLocation)});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './server/views'))
// app.use(cookieParser())

function initialize(){
    
mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
}

mongoose.connection.on("connected", () => {
    console.log(log.addMetadata("Successfully connected to database.", "info"));
});



function checkInitialSetUpProgress(){
    if (!configuration.safeConfiguration.applicationIsSetUp){
        setup.startSetUp(_.cloneDeep(configuration));
    } else {
        initialize();
    }
}

require("fs").readdirSync(require("path").join(__dirname, "/server/routes")).forEach((file) => {
    app.use(require("./server/routes/" + file));
});
app.use(require("./server/core/operations.js"));
app.use(require("./server/core/api.js"));

// TODO: Relocate this.
io.on("connection", (socket) => {
    socket.on("sendChatMessage", (message) => {
        io.emit("receiveChatMessage", message);
    })
})




server.listen(configuration.unsafeConfiguration.port, () => {
    console.log(log.addMetadata(`App listening on port ${configuration.unsafeConfiguration.port}`, "info"));
    checkInitialSetUpProgress();

});
