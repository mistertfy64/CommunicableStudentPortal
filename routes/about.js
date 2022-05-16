var router = require("express").Router();
const configuration = require("../configuration.js");

router.get("/about", (request, response) => {
    response.render("pages/about", {configuration: configuration.safeConfiguration}); 
});

module.exports = router;