import NodeCache from 'node-cache';
import TelegramBot from 'node-telegram-bot-api';

import config from './config.js';
import conventer from './conventer.js';
import monoback_api from './monoback_api.js';
import privatbank_api from './privatbank_api.js';

const Cache = new NodeCache({ checkperiod: 120 });
const bot = new TelegramBot(config.bot_token, { polling: true });

bot.onText(/\/start/, msg => {
	const request = {
		reply_markup: {
			keyboard: [
				[
					{
						text: 'USD'
					},
					{
						text: 'EUR'
					}
				]
			],
			resize_keyboard: true
		}
	};

	bot.sendMessage(
		msg.chat.id,
		`Hi! I'm 'Dobra exchange rate' bot! I can show EUR and USD exchange rates in Privatbank and Monobank.`,
		request
	);
});

bot.on('text', async msg => {
	try {
		switch (msg.text.toUpperCase()) {
			case 'USD':
				if (Cache.has('USD')) {
					const data = Cache.get('USD');
					const response = conventer.toString(data);

					bot.sendMessage(msg.chat.id, response);
				} else {
					const data = await getUSD();
					const response = conventer.toString(data);

					Cache.set('USD', data);

					bot.sendMessage(msg.chat.id, response);
				}

				break;
			case 'EUR':
				if (Cache.has('EUR')) {
					const data = Cache.get('EUR');
					const response = conventer.toString(data);

					bot.sendMessage(msg.chat.id, response);
				} else {
					const data = await getEUR();
					const response = conventer.toString(data);

					Cache.set('EUR', data);

					bot.sendMessage(msg.chat.id, response);
				}

				break;
			default:
				if (msg.text !== `/start`)
					bot.sendMessage(msg.chat.id, 'Currency not found.');
		}
	} catch (err) {
		console.log(err);
		bot.sendMessage(
			msg.chat.id,
			'Some problem on server side, try again another time.'
		);
	}
});

const getUSD = async () => {
	const monoResponse = await monoback_api.get();
	const monoData = monoResponse.data;

	const privateRespone = await privatbank_api.get();
	const privatData = privateRespone.data;

	const monoUSD = monoData.find(elem => elem.currencyCodeA == 840);
	const privatUSD = privatData.find(elem => elem.ccy == 'USD');

	const response = {
		currency: 'USD',
		mono: monoUSD,
		privat: privatUSD
	};

	return response;
};

const getEUR = async () => {
	const monoResponse = await monoback_api.get();
	const monoData = monoResponse.data;

	const privateRespone = await privatbank_api.get();
	const privatData = privateRespone.data;

	const monoUSD = monoData.find(elem => elem.currencyCodeA == 978);
	const privatUSD = privatData.find(elem => elem.ccy == 'EUR');

	const response = {
		currency: 'EUR',
		mono: monoUSD,
		privat: privatUSD
	};

	return response;
};
