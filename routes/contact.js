var router = require("express").Router();

router.get("/contact", (request, response) => {
    response.render("pages/contact", {configuration: safeConfiguration}); 
});

module.exports = router;