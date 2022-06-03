var router = require("express").Router();
const configuration = require("../configuration.js");
const url = require("url");
const User = require("../models/User.js");

router.get("/users/:userID", (request, response) => {
    let safe = request.query.safe;
    if (false){}
    
    if (!(safe === true || safe === false)){
        res.status(400).send("Error 400");
        return;
    }
    if (safe){
        User.safeFindUserByUserID(request.params.userID)
    } else {

    }
});

module.exports = router;