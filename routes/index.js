var router = require("express").Router();
const configuration = require("../configuration.js");

router.get("/", (request, response) => {
    response.render("pages/index", {configuration: configuration.safeConfiguration}); 
});

module.exports = router;