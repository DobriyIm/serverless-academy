import axios from 'axios';
import config from './config.js';

const getData = async (lat, lon) => {
	const request = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${config.api_key}`;

	try {
		const response = await axios.get(request);

		return response.data;
	} catch (err) {
		console.log('Openweather API error: ', err);
	}
};

export default { getData };
