var router = require("express").Router();
const configuration = require("../configuration.js");

router.get("/announcements", (request, response) => {
    response.render("pages/announcements", {configuration: configuration.safeConfiguration}); 
});

module.exports = router;