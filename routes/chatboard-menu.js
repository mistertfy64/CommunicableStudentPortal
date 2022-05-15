var router = require("express").Router();

router.get("/chatboard-menu", (request, response) => {
    response.render("pages/chatboard-menu", {configuration: safeConfiguration}); 
});
module.exports = router;