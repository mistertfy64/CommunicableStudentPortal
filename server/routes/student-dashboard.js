var router = require("express").Router();
const configuration = require("../configuration.js");

router.get("/student-dashboard", (request, response) => {
    response.render("pages/user/student-dashboard", {configuration: configuration.safeConfiguration}); 
});

module.exports = router;