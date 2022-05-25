var router = require("express").Router();
const configuration = require("../configuration.js");

router.get("/studymaterial-content", (request, response) => {
    response.render("pages/studymaterial-content", {configuration: configuration.safeConfiguration}); 
});

module.exports = router;