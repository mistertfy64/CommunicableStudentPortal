var router = require("express").Router();
const configuration = require("../configuration.js");

router.get("/studymaterial-select", (request, response) => {
    response.render("pages/studymaterial-select", {configuration: configuration.safeConfiguration}); 
});

module.exports = router;