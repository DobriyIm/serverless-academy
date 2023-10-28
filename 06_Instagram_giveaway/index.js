import * as fs from 'fs/promises';

const uniqueValues = async () => {
	const words = new Set();
	const promises = [];

	try {
		for (let i = 0; i < 20; i++) {
			const path = `./files/out${i}.txt`;

			const filePromise = fs.readFile(path, 'utf-8').then(data => {
				const lines = data.split('\n');

				for (const line of lines) {
					words.add(line);
				}
			});

			promises.push(filePromise);
		}

		await Promise.all(promises);
	} catch (err) {
		console.log(err);
		return;
	}

	return words.size;
};

const existInAllFiles = async () => {
	const wordCounts = new Map();
	const promises = [];

	try {
		for (let i = 0; i < 20; i++) {
			const path = `./files/out${i}.txt`;

			const filePromise = fs.readFile(path, 'utf-8').then(data => {
				const lines = data.split('\n');

				for (const line of lines) {
					if (!wordCounts.has(line)) wordCounts.set(line, 1);
					else wordCounts.set(line, wordCounts.get(line) + 1);
				}
			});

			promises.push(filePromise);
		}

		await Promise.all(promises);
	} catch (err) {
		console.log(err);
		return;
	}

	const totalCount = [...wordCounts.values()].filter(
		value => value == 20
	).length;

	return totalCount;
};

const existInAtleastTen = async () => {
	const wordCounts = new Map();
	const promises = [];

	try {
		for (let i = 0; i < 20; i++) {
			const path = `./files/out${i}.txt`;

			const filePromise = fs.readFile(path, 'utf-8').then(data => {
				const lines = data.split('n');

				for (const line of lines) {
					if (!wordCounts.has(line)) wordCounts.set(line, 1);
					else wordCounts.set(line, wordCounts.get(line) + 1);
				}
			});

			promises.push(filePromise);
		}

		await Promise.all(promises);
	} catch (err) {
		console.log(err);
		return;
	}

	const totalCount = [...wordCounts.values()].filter(
		value => value >= 10
	).length;

	return totalCount;
};

const main = async () => {
	console.time('Total time');
	console.log(`Number of unique words: ${await uniqueValues()}`);
	console.log(
		`Number of words that are present in all 20 files: ${await existInAllFiles()}`
	);
	console.log(
		`Number of words that appear in at least 10 files: ${await existInAtleastTen()}`
	);
	console.timeEnd('Total time');
};

main();
