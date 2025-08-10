import { CommandInteraction, REST, Routes, SlashCommandBuilder } from "discord.js";

import Path from 'path';
import Fs from 'fs';
import { log } from 'console';
import { Config } from "../Configs/Config";
import { ColorLog } from "../Models/Colors";

interface SlashCommand {
    Data: SlashCommandBuilder;
    Active: boolean;
    Execute: (interaction: CommandInteraction) => Promise<void>;
}
const Commands: Array<any> = [];

const CommandsHandler = async() => {
    const EPath = Path.join(__dirname, "..", "Commands");
    if (!Fs.existsSync(EPath)) return console.error("Commands Directory Not Found");

    const Folder = Fs.readdirSync(EPath).filter(file => file.endsWith('.ts'));

    for (let File of Folder) {
        const filePath = Path.join(EPath, File);
        const FixedFile = filePath.slice(0, -3); // Remove the .ts extension
        const Module = require(FixedFile).default;
        if (!Module) continue;
        const CommandModule = new Module();
        
        if (!CommandModule || !CommandModule.Data || !CommandModule.Active || typeof CommandModule.Execute !== 'function') {
            // console.warn(`❗ Invalid command module: ${File}`);
            continue;
        }

        log(CommandModule.Data.name, "✅ Command Loaded");
        Commands.push(CommandModule); // Optional: if you want to keep a list
    }

    const rest = new REST({ version: "10" }).setToken(Config.TOKEN);
    try {
        ColorLog("&6&oRegistering slash commands...");
        await rest.put(
            Routes.applicationGuildCommands(Config.CLIENT_ID, Config.GUILD_ID),
            { body: Commands.map(c => c.Data.toJSON()) }
        );
        ColorLog("&eSlash commands registered.");
    } catch (error) {
        console.error("Error registering commands:", error);
    }

}

export { Commands, CommandsHandler };
