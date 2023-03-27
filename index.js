// Require the necessary discord.js classes ---- 36:08 minutos
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

// Criando dotenv com require
const dotenv = require('dotenv');
dotenv.config()
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env

//Importação dos comandos
const fs = require("node:fs");
const path = require('node:path');
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()


for (const file of commandFiles){
	const filePath = path.join(commandsPath, file)
	const command = require(filePath)
	// // Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

console.log(client.commands)

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Pronto! Login realizado como ${c.user.tag}`);
});
client.login(TOKEN)

//Listenner de interação
client.on(Events.InteractionCreate, async interaction => {
	if(!interaction.isChatInputCommand()) return
	const command = interaction.client.commands.get(interaction.commandName)
	if (!command){
		console.error("Comando não encontrado")
		return
	}
	try{
		await command.execute(interaction)
	}
	catch(error){
		console.error(error)
		await interaction.reply("Ops... Houve um erro ao executar esse comando!")
	}
})
