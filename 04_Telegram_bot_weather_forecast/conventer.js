const toString = (data, location) => {
	const forecast = data.map(item => {
		return `Дата и время: ${item.dt_txt}\nТемпература: ${(
			item.main.temp - 273.15
		).toFixed(1)}°C\n`;
	});

	const locationName = location
		? `Location: ${location.name} | Country: ${location.country}\n\n`
		: null;
	const str = locationName
		? locationName + forecast.join('\n')
		: forecast.join('\n');
	return str;
};

export default { toString };
