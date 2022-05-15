var router = require("express").Router();

router.get("/updates", (request, response) => {
    response.render("pages/updates", {configuration: safeConfiguration}); 
});

module.exports = router;