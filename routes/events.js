var router = require("express").Router();

router.get("/events", (request, response) => {
    response.render("pages/event", {configuration: safeConfiguration}); 
});

module.exports = router;