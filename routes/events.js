var router = require("express").Router();
const configuration = require("../configuration.js");

router.get("/events", (request, response) => {
    response.render("pages/event", {configuration: configuration.safeConfiguration}); 
});

module.exports = router;