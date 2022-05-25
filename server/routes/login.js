var router = require("express").Router();
const configuration = require("../configuration.js");

router.get("/login", (request, response) => {
    response.render("pages/login", {configuration: configuration.safeConfiguration}); 
});

module.exports = router;