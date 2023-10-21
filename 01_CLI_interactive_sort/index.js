import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';

const userInput = async text => {
	const rl = readline.createInterface({ input, output });
	const answer = await rl.question(text);
	rl.close();

	if (answer.toLowerCase() === 'exit') {
		console.log('\nGoodbye!');
		process.exit(1);
	}

	return answer;
};

const uniqueSort = mass => {
	let result = [];

	mass.forEach(word => {
		if (!result.includes(word)) result.push(word);
	});

	return result;
};

const main = async () => {
	const userText = await userInput(
		`\nHello! Enter words or numbers separated by a space: `
	);

	console.log(
		`\nHow would u like to sort values:\n1. Words by name(form A to Z).\n2. Show numbers from the smallest.\n3. Show numbers from the biggest.\n4. Words by quantity of letters.\n5. Only unique words.\n6. Unique words and nubmers.`
	);

	const sortingType = await userInput(
		'\nSelect (1 - 5) and press Enter:\n'
	);

	const mass = userText.split(' ');

	let words = [];
	let numbers = [];

	mass.forEach(item => {
		if (isNaN(item)) words.push(item);
		else numbers.push(item);
	});

	switch (+sortingType) {
		case 1:
			console.log(words.sort().concat(numbers));
			break;
		case 2:
			console.log(numbers.sort((a, b) => a - b).concat(words));
			break;
		case 3:
			console.log(numbers.sort((a, b) => b - a).concat(words));
			break;
		case 4:
			console.log(
				words.sort((a, b) => a.length - b.length).concat(numbers)
			);
			break;
		case 5:
			console.log(uniqueSort(words).concat(numbers));
			break;
		case 6:
			console.log(uniqueSort(mass));
			break;
	}

	main();
};

main();
