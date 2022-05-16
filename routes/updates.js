var router = require("express").Router();
const configuration = require("../configuration.js");

router.get("/updates", (request, response) => {
    response.render("pages/updates", {configuration: configuration.safeConfiguration}); 
});

module.exports = router;