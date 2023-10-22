import * as fs from 'fs/promises';
import inquirer from 'inquirer';

const fileName = 'db.txt';

const load = async () => {
	try {
		const db = [];

		const fileData = await fs.readFile(fileName, 'utf-8');
		const lines = fileData.split('\n');

		lines.forEach(line => {
			if (line) db.push(JSON.parse(line));
		});

		return db;
	} catch (err) {
		console.log(err);
	}
};

const save = async user => {
	try {
		await fs.appendFile(fileName, JSON.stringify(user) + '\n');
	} catch (err) {
		console.log(err);
	}
};

const creation = async () => {
	const questions = [
		{
			name: `username`,
			message: `Enter the user's name. To cancel press Enter:`,
			type: `input`
		},
		{
			name: 'gender',
			message: `Choose your Gender(Use arrows):`,
			type: `list`,
			choices: [`male`, `female`]
		},
		{
			name: `age`,
			message: `Enter your age:`,
			type: `number`
		}
	];

	let user = await inquirer.prompt(questions[0]);

	if (!user.username) {
		search();
	} else {
		Object.assign(user, await inquirer.prompt(questions.slice(1)));

		await save(user);

		creation();
	}
};

const search = async () => {
	const questions = [
		{
			name: `ifContinue`,
			message: `Would you to search values in DB?(Use arrows)`,
			type: `list`,
			choices: [`Yes`, `No`]
		},
		{
			name: `request`,
			message: `\nEnter user's name you wanna find in db:`,
			type: `input`
		}
	];

	const ifContinue = (await inquirer.prompt(questions[0])).ifContinue;
	if (ifContinue === 'No') {
		console.log('\nGoodbye!');
		process.exit(1);
	}

	const db = await load();

	console.log('\n');
	console.log(db);

	const request = (await inquirer.prompt(questions[1])).request;

	const result = db.filter(
		user => user.username.toLowerCase() === request.toLowerCase()
	);

	if (result.length == 0) console.log('Users not found.');
	else console.log(result);
};

const main = async () => {
	creation();
};

main();
