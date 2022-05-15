const fs = require("fs");
const _ = require("lodash");

let loadedConfiguration = {};
let configuration = {};
let safeConfiguration = {};

function initialize() {
	let loadedConfiguration = JSON.parse(
		fs.readFileSync("configuration.json", "utf8")
	);
	// get configuration and credentials
	longClone(configuration, _.cloneDeep(loadedConfiguration));
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
	configuration: configuration,
	safeConfiguration: safeConfiguration,
};
module.exports.initialize = initialize;
