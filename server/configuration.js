const fs = require("fs");
const _ = require("lodash");

let loadedConfiguration = {};
let unsafeConfiguration = {};
let safeConfiguration = {};

function initialize() {
	let loadedConfiguration = JSON.parse(
		fs.readFileSync(__dirname + "/configuration.json", "utf8")
	);
	let loadedText = JSON.parse(fs.readFileSync(__dirname + "/text.json", "utf8"));
	_.merge(loadedConfiguration, loadedText);
	// get configuration and credentials
	longClone(unsafeConfiguration, _.cloneDeep(loadedConfiguration));
	// derive a safer configuration object
	let nonFinalSafeConfiguration = stripSensitiveConfigurationData(
		_.cloneDeep(loadedConfiguration)
	);
	longClone(safeConfiguration, nonFinalSafeConfiguration);
	
	console.log("Initialized Configuration!");
}

function longClone(objectToCloneTo, objectToCloneFrom) {
	Object.keys(objectToCloneFrom).forEach((key) => {
		objectToCloneTo[key] = objectToCloneFrom[key];
	});
}

function stripSensitiveConfigurationData(loadedConfiguration) {
	let newConfiguration = _.cloneDeep(loadedConfiguration);
	delete newConfiguration.environmentVariablesFileLocation;
	return newConfiguration;
}

module.exports = {
	unsafeConfiguration: unsafeConfiguration,
	safeConfiguration: safeConfiguration,
};
module.exports.initialize = initialize;
