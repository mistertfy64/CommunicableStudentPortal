var router = require("express").Router();
const configuration = require("../configuration.js");

router.get("/studymaterial-prototype", (request, response) => {
    response.render("pages/studymaterial-prototype", {configuration: configuration.safeConfiguration}); 
});

module.exports = router;