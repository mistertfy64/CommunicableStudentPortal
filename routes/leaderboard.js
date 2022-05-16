var router = require("express").Router();
const configuration = require("../configuration.js");

router.get("/leaderboard", (request, response) => {
    response.render("pages/leaderboard", {configuration: configuration.safeConfiguration}); 
});

module.exports = router;