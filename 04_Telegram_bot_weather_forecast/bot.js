import TelegramBot from 'node-telegram-bot-api';

import config from './config.js';
import conventer from './conventer.js';
import geocoding_api from './geocoding_api.js';
import openweather_api from './openweather_api.js';

/**
 * Здравствуйте. Извиняюсь сразу за такой вид кода. Я неправильно понял задание, поэтому немного перестарался, и из за этого вылезли другие проблемы,
 * поэтому код получился не очень, а привести в порядок - меня времени не хватает. А без выбора интеравала не отправили ибо не по тз)
 */

const bot = new TelegramBot(config.token, { polling: true });

var interval = 3;

const ui = {
	start: {
		text: `Hello, i'm Dobra Weather bot! `
	},
	intervals: {
		text: `Select the interval at which you would like to receive the forecast.`,
		body: {
			reply_markup: {
				keyboard: [
					['at intervals of 3 hours', 'at intervals of 6 hours']
				],
				resize_keyboard: true
			}
		}
	},
	interval_3: {
		text: `You chose intervals of 3 hours.`
	},
	interval_6: {
		text: `You chose intervals of 6 hours.`
	},
	location: {
		text: `Enter the name of the locality, or share the geo location.`,
		body: {
			reply_markup: {
				keyboard: [
					[
						{
							text: 'Share geo location',
							request_location: true
						}
					]
				],
				resize_keyboard: true
			}
		}
	}
};

const exeptions = [
	'/start',
	'at intervals of 3 hours',
	'at intervals of 6 hours'
];

bot.onText(/\/start/, msg => {
	bot.sendMessage(
		msg.chat.id,
		ui.start.text + ui.intervals.text,
		ui.intervals.body
	);
});

bot.onText(/at intervals of 3 hours/, msg => {
	interval = 3;

	bot.sendMessage(
		msg.chat.id,
		ui.interval_3.text + ui.location.text,
		ui.location.body
	);
});

bot.onText(/at intervals of 6 hours/, msg => {
	interval = 6;

	bot.sendMessage(
		msg.chat.id,
		ui.interval_6.text + ui.location.text,
		ui.location.body
	);
});

bot.on('location', async msg => {
	const lat = msg.location.latitude;
	const lon = msg.location.longitude;

	const data =
		interval == 6
			? filter((await openweather_api.getData(lat, lon)).list)
			: (await openweather_api.getData(lat, lon)).list;

	await bot.sendMessage(msg.chat.id, conventer.toString(data));

	bot.sendMessage(msg.chat.id, ui.intervals.text, ui.intervals.body);
});

bot.on('text', async msg => {
	if (!exeptions.includes(msg.text)) {
		const location = await geocoding_api.getGeoPosition(msg.text);

		if (!location)
			bot.sendMessage(msg.chat.id, `No such locality was found.`);
		else {
			const data =
				interval == 6
					? filter(
							(
								await openweather_api.getData(
									location.lat,
									location.lon
								)
							).list
					  )
					: (
							await openweather_api.getData(
								location.lat,
								location.lon
							)
					  ).list;

			await bot.sendMessage(
				msg.chat.id,
				conventer.toString(data, location)
			);

			bot.sendMessage(
				msg.chat.id,
				ui.intervals.text,
				ui.intervals.body
			);
		}
	}
});

const filter = data => {
	const filtered = [];

	for (let i = 1; i < data.length; i += 2) {
		filtered.push(data[i]);
	}

	return filtered;
};
