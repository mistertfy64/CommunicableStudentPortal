var router = require("express").Router();
const configuration = require("../configuration.js");

router.get("/signup", (request, response) => {
    response.render("pages/signup", {configuration: configuration.safeConfiguration}); 
});

module.exports = router;