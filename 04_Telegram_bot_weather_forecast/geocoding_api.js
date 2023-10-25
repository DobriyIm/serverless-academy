import axios from 'axios';
import config from './config.js';

const getGeoPosition = async location => {
	const request = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${config.api_key}`;

	try {
		const response = await axios.get(request);

		const location =
			response.data.length > 0 ? response.data[0] : null;

		return location;
	} catch (err) {
		console.log('Geocoding API error: ', err);
	}
};

export default { getGeoPosition };
