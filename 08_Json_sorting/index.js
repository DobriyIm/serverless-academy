import axios from 'axios';

const urlList = [
	'https://jsonbase.com/sls-team/json-793',
	'https://jsonbase.com/sls-team/json-955',
	'https://jsonbase.com/sls-team/json-231',
	'https://jsonbase.com/sls-team/json-931',
	'https://jsonbase.com/sls-team/json-93',
	'https://jsonbase.com/sls-team/json-342',
	'https://jsonbase.com/sls-team/json-770',
	'https://jsonbase.com/sls-team/json-491',
	'https://jsonbase.com/sls-team/json-281',
	'https://jsonbase.com/sls-team/json-718',
	'https://jsonbase.com/sls-team/json-310',
	'https://jsonbase.com/sls-team/json-806',
	'https://jsonbase.com/sls-team/json-469',
	'https://jsonbase.com/sls-team/json-258',
	'https://jsonbase.com/sls-team/json-516',
	'https://jsonbase.com/sls-team/json-79',
	'https://jsonbase.com/sls-team/json-706',
	'https://jsonbase.com/sls-team/json-521',
	'https://jsonbase.com/sls-team/json-350',
	'https://jsonbase.com/sls-team/json-64'
];

const sendRequest = async url => {
	for (let i = 0; i < 3; i++) {
		try {
			const result = await axios.get(url);

			return result;
		} catch {
			if (i == 2) throw `[Fail] ${url}: The endpoint is unavailable`;
		}
	}
};

const sorting = data => {
	for (const key in data) {
		if (Array.isArray(data[key])) {
			for (const item of data[key]) {
				const result = sorting(item);
				if (result !== undefined) return result;
			}
		} else if (typeof data[key] === 'object' && data[key] !== null) {
			return sorting(data[key]);
		} else {
			if (key == 'isDone') {
				return data[key];
			}
		}
	}
};

const main = async () => {
	for (const url of urlList) {
		try {
			const data = await sendRequest(url);
			const result = sorting(data);

			console.log(`[Success] ${url}: isDone - ${result}`);
		} catch (err) {
			console.log(err);
		}
	}
};

main();
