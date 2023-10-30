import * as fs from 'fs/promises';

const convertJson = async data => {
	const result = [];

	data.forEach(element => {
		const userId = element.user._id;

		const currentUser = result.find(item => item.userId == userId);

		if (!currentUser) {
			const userName = element.user.name;
			const vacations = [
				{
					startDate: element.startDate,
					endDate: element.endDate
				}
			];

			const newUser = {
				userId: userId,
				userName: userName,
				vacations: vacations
			};

			result.push(newUser);
		} else {
			currentUser.vacations.push({
				startDate: element.startDate,
				endDate: element.endDate
			});
		}
	});

	await fs.writeFile('./convertedData.json', JSON.stringify(result));
};

const main = async () => {
	const data = await fs.readFile('./data.json');
	await convertJson(JSON.parse(data));
};

main();
