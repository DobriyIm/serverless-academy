import { Command } from 'commander';
import TelegramBot from 'node-telegram-bot-api';
import config from './config.js';

const program = new Command();
const bot = new TelegramBot(config.token);

program
	.command('message <message>')
	.alias('m')
	.description('Send a message to the Telegram Bot')
	.action(async message => {
		await bot.sendMessage(config.chatId, message);
		process.exit(1);
	});

program
	.command('photo <path>')
	.alias('p')
	.description(
		'Send photo to Telegram Bot. Just drag and drop into console after p-flag'
	)
	.action(async path => {
		await bot.sendPhoto(config.chatId, path);
		process.exit(1);
	});

program
	.option('-h, --help', ' display help for command')
	.option('-V, --version', 'output the version number');

const main = () => {
	program.parse();
};

main();
