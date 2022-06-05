var router = require("express").Router();
const configuration = require("../configuration.js");

router.get("/chat", (request, response) => {
    response.render("pages/chat", {configuration: configuration.safeConfiguration}); 
});

module.exports = router;