var router = require("express").Router();
const configuration = require("../configuration.js");

router.get("/studymaterial", (request, response) => {
    response.render("pages/studymaterial-menu", {configuration: configuration.safeConfiguration}); 
});

module.exports = router;