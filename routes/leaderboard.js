var router = require("express").Router();

router.get("/leaderboard", (request, response) => {
    response.render("pages/leaderboard", {configuration: safeConfiguration}); 
});

module.exports = router;