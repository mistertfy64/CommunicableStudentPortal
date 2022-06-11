var router = require("express").Router();
const configuration = require("../configuration.js");
const User = require("../models/User.js");


router.get("/leaderboard", async (request, response) => {
    response.render("pages/leaderboard", {configuration: configuration.safeConfiguration, data: []}); 
});


router.get("/leaderboard/:stat", async (request, response) => {
    let statToGet = request.params.stat;
    let data = await User.getStatValueForLeaderboards(statToGet);
    console.log(data);
    response.render("pages/leaderboard", {configuration: configuration.safeConfiguration, data: data, stat: statToGet}); 
});

module.exports = router;