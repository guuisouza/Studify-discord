// Require the necessary discord.js classes ---- 36:08 minutos
const { Client, Events, GatewayIntentBits } = require('discord.js');

// Criando dotenv com require
const dotenv = require('dotenv');
dotenv.config()
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env

//Importação dos comandos
const fs = require("node:fs");
const path = require('node:path');


const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles){
	const filePath = path.join(commandsPath, file)
	const commands = require(filePath)
	console.log(commands)
	// // Set a new item in the Collection with the key as the command name and the value as the exported module
	// if ('data' in slash_commands && 'execute' in slash_commands) {
	// 	client.slash_commands.set(slash_commands.data.name, slash_commands);
	// } else {
	// 	console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	// }

}

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Pronto! Login realizado como ${c.user.tag}`);
});

client.login(TOKEN)