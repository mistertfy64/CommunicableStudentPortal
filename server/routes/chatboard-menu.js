var router = require("express").Router();
const configuration = require("../configuration.js");

router.get("/chatboard-menu", (request, response) => {
    response.render("pages/chatboard-menu", {configuration: configuration.safeConfiguration}); 
});
module.exports = router;