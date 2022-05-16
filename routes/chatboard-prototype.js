var router = require("express").Router();
const configuration = require("../configuration.js");

router.get("/chatboard-prototype", (request, response) => {
    response.render("pages/chatboard-prototype", {configuration: configuration.safeConfiguration}); 
});

module.exports = router;