var router = require("express").Router();
const configuration = require("../configuration.js");

router.get("/blog-menu", (request, response) => {
    response.render("pages/blog-menu", {configuration: configuration.safeConfiguration}); 
});

module.exports = router;