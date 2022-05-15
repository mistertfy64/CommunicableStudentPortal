var router = require("express").Router();

router.get("/signup", (request, response) => {
    response.render("pages/signup", {configuration: safeConfiguration}); 
});

module.exports = router;