const toString = response => {
	const dateStr = `Date/time: ${new Date().toLocaleString()}
	`;

	const currencyStr = `Currency: ${response.currency}
	`;

	const monoStr = `
	Monobank:
  		Buy: ${parseFloat(response.mono.rateBuy).toFixed(1)}
  		Sell: ${parseFloat(response.mono.rateSell).toFixed(1)}
`;

	const privatSTR = `
	Privatbank:
  		Buy: ${parseFloat(response.privat.buy).toFixed(1)}
  		Sell: ${parseFloat(response.privat.sale).toFixed(1)}
`;

	return dateStr + currencyStr + monoStr + privatSTR;
};

export default { toString };
