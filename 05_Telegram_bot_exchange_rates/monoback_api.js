import axios from 'axios';

const get = async () => {
	try {
		const response = await axios.get(
			'https://api.monobank.ua/bank/currency'
		);
		return response;
	} catch (err) {
		throw {
			code: err.code,
			api: 'monoback API',
			message: err.response.data
		};
	}
};

export default { get };
