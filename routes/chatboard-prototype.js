var router = require("express").Router();

router.get("/chatboard-prototype", (request, response) => {
    response.render("pages/chatboard-prototype", {configuration: safeConfiguration}); 
});

module.exports = router;