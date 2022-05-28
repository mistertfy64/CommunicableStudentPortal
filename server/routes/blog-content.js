var router = require("express").Router();
const configuration = require("../configuration.js");

router.get("/blog-content", (request, response) => {
    response.render("pages/blog-content", {configuration: configuration.safeConfiguration}); 
});

module.exports = router;