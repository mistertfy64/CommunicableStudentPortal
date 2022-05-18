var router = require("express").Router();
const configuration = require("../configuration.js");

router.get("/studymaterial-prototye", (request, response) => {
    response.render("pages/studymaterial-prototype", {configuration: configuration.safeConfiguration}); 
});

module.exports = router;