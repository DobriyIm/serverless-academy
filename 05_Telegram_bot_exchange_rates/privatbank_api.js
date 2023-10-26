import axios from 'axios';

const get = async () => {
	try {
		const response = await axios.get(
			'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
		);
		return response;
	} catch (err) {
		throw {
			api: 'privatbank API',
			message: err
		};
	}
};

export default { get };
