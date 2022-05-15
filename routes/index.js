var router = require("express").Router();

router.get("/", (request, response) => {
    response.render("pages/index", {configuration: safeConfiguration}); 
});

module.exports = router;