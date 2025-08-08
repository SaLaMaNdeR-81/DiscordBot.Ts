import { REST, Routes, SlashCommandBuilder } from "discord.js";
import { client as Client } from "../Configs/Client";
import { Config } from "../Configs/Config";
import fs from "node:fs";
import path from "node:path";
import { ColorLog } from "../Models/Colors";

const commands: any[] = [];

const CommandsHandler = async() => {
    const commandsPath = path.join(__dirname, "../Commands");
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".ts"));

    for (let File of commandFiles) {
        // File = File.slice(0,-3)
        // console.log(File);
        const command = await import(path.join(commandsPath, File));
        if ("data" in command && "execute" in command) {
            commands.push(command);
        }
    }

    const rest = new REST({ version: "10" }).setToken(Config.TOKEN);

    try {
        ColorLog("&6&oRegistering slash commands...");
        await rest.put(
            Routes.applicationGuildCommands(Config.CLIENT_ID, Config.GUILD_ID),
            { body: commands.map(c => c.data.toJSON()) }
        );
        ColorLog("&eSlash commands registered.");
    } catch (error) {
        console.error("Error registering commands:", error);
    }
}

export { CommandsHandler, commands };