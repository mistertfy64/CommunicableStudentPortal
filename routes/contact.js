var router = require("express").Router();
const configuration = require("../configuration.js");

router.get("/contact", (request, response) => {
    response.render("pages/contact", {configuration: configuration.safeConfiguration}); 
});

module.exports = router;