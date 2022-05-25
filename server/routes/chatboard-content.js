var router = require("express").Router();
const configuration = require("../configuration.js");

router.get("/chatboard-content", (request, response) => {
    response.render("pages/chatboard-content", {configuration: configuration.safeConfiguration}); 
});

module.exports = router;