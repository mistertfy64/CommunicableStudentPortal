var router = require("express").Router();
const configuration = require("../configuration.js");

router.get("/administrator-dashboard", (request, response) => {
    response.render("pages/administrator/administrator-dashboard", {configuration: configuration.safeConfiguration}); 
});

module.exports = router;