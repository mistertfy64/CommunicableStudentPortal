var router = require("express").Router();

router.get("/studymaterial", (request, response) => {
    response.render("pages/studymaterial-menu", {configuration: safeConfiguration}); 
});

module.exports = router;