var router = require("express").Router();
const bodyParser = require("body-parser");

const configuration = require("../configuration.js");

const authentication = require("../core/authentication.js");

let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({ extended: true });

router.get("/login", (request, response) => {
	response.render("pages/authentication/login", {
		configuration: configuration.safeConfiguration,
	});
});

router.post("/login", urlencodedParser, (request, response) => {
	let credentials = request.body;
    console.log(request.body);
    let options = {
        persistent: credentials.options === "persistent" || credentials.options?.indexOf("persistent") > -1,
        destroyOtherSessions: credentials.options === "destroy-other-sessions" || credentials.options?.indexOf("destroy-other-sessions") > -1,
    }
    console.log(options);
	authentication
		.authenticate(credentials.username, credentials.password, options)
		.then((result) => {
			if (!result.successful) {
				// failed
				console.log("Failed.");
				return;
			}
			// success
			console.log("Successful.");

		});
});

module.exports = router;
