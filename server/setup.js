const chalk = require("chalk");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

async function startSetUp(configuration) {
	let itemsToSetUp = "";

	console.log(chalk.white("Welcome to CommunicableStudentPortal!"));
	console.log(
		chalk.white(
			"Before you can start using CommunicableStudentPortal, you have to set it up first. Fear not, this set up wizard will guide you!"
		)
	);
	console.log(
		chalk.white(
			"Please specify which items to set up, include the characters with the response prompt for the things you want to set up."
		)
	);
	console.log(
		chalk.white(
			'e.g. if you want to set up Personalization and Styling, type "PS".'
		)
	);
	console.log(
		chalk.white("You can always enable other features manually later.")
	);

	console.log("");
	console.log(chalk.white(`${chalk.underline(`P`)}ersonalization`));
	// console.log(chalk.white(`${chalk.underline(`S`)}tyling`)); <-- do it yourself lol -->
	console.log(chalk.white(`${chalk.underline(`T`)}op Navigation Bar`));
	console.log("");

	await inquirer
		.prompt({
			message: chalk.reset("Enter the items you want to setup."),
			name: "itemsToSetUp",
			prefix: "",
		})
		.then((answers) => {
			itemsToSetUp = answers.itemsToSetUp;
		});

	itemsToSetUp.includes("P") &&
		(await startPersonalizationSetup(configuration));
	// itemsToSetUp.includes("S") && startStylingSetup();
	itemsToSetUp.includes("T") &&
		(await startTopNavigationBarSetup(configuration));

	console.log(
		chalk.white(
			"Almost there! But first, you have to set some important settings."
		)
	);

	await inquirer
		.prompt({
			message: chalk.reset(
				"Enter the port that you want the application to run on."
			),
			name: "port",
			prefix: "",
		})
		.then((answers) => {
			configuration.port = answers.port;
		});

	await inquirer
		.prompt({
			message: chalk.reset(
				"Enter your MongoDB connection string. This will not be revealed since it is stored in a separate .env file on your machine."
			),
			name: "databaseConnectionString",
			prefix: "",
		})
		.then((answers) => {
			fs.writeFileSync(
				path.join('./', "/credentials.env"),
				`DATABASE_URI=${answers.databaseConnectionString}`
			);
		});

	configuration.environmentVariablesFileLocation = "credentials.env";
	configuration.applicationIsSetUp = true;

	// save settings
	fs.writeFileSync(
		path.join('./', "/configuration.json"),
		JSON.stringify(configuration, null, 4)
	);

	console.log(
		chalk.white(
			"You have completed the setup! Please restart (stop and start again) the app to use."
		)
	);
	console.log(
		chalk.white("You can still edit styling in the styles.css file.")
	);

	process.exit(0);
}

async function startPersonalizationSetup(configuration) {
	console.log(chalk.white(`Personalization Setup`));
	let name;
	await inquirer
		.prompt([
			{
				message: chalk.reset(
					"Enter the name to display on the application (e.g. the educational institution's name)."
				),
				name: "name",
				prefix: "",
			},
		])
		.then((answers) => {
			configuration.name = answers.name;
		});
	console.log(chalk.white(`Finished Personalization Setup`));
}

async function startTopNavigationBarSetup(configuration) {
	configuration.topNavigationBarSections = {};
	let finished = false;
	console.log(chalk.white(`Top Navigation Bar Setup`));
	console.log(
		chalk.white(
			`This is how the top navigation bar will look like (position number): [1 2 3 4              -2 -1]`
		)
	);

	while (!finished) {
		await startTopNavigationBarSectionSetup(configuration);

		await inquirer
			.prompt([
				{
					message: chalk.reset(
						"Do you want to create an another top navigation bar section? (y/N)"
					),
					name: "choice",
					prefix: "",
				},
			])
			.then((answers) => {
				// TODO: Actually make this work lol.
				finished =
					answers.choice.includes("n") ||
					answers.choice.includes("N") ||
					answers.choice == "";
			});
	}
	console.log(chalk.white(`Finished Top Navigation Bar Setup`));
}

async function startTopNavigationBarSectionSetup(configuration) {
	await inquirer
		.prompt([
			{
				message: chalk.reset(
					"Enter a top navigation bar section's name. This name will be used internally."
				),
				name: "name",
				prefix: "",
			},
			{
				message: chalk.reset(
					"Enter the top navigation bar section's text."
				),
				name: "text",
				prefix: "",
			},
			{
				message: chalk.reset("Enter the link where it should lead to."),
				name: "link",
				prefix: "",
			},
			{
				message: chalk.reset("Enter the position of the section."),
				type: "number",
				name: "position",
				prefix: "",
			},
		])
		.then((answers) => {
			configuration.topNavigationBarSections[answers.name] = {
				text: answers.text,
				link: answers.link,
				position: answers.position,
			};
		});
}

module.exports = { startSetUp };
