var router = require("express").Router();

router.get("/login", (request, response) => {
    response.render("pages/login", {configuration: safeConfiguration}); 
});

module.exports = router;