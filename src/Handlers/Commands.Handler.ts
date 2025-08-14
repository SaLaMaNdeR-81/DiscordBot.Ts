import { CommandInteraction, REST, Routes, SlashCommandBuilder } from "discord.js";

import Path from 'path';
import Fs from 'fs';
import { log } from 'console';
import { Config } from "../Configs/Config";
import { ColorLog } from "../Models/Colors";


//# =============              =============
//#              ==============
//!             Commands Handler 
//#              ==============
//# =============              =============

type SlashCommand = {
    Data: SlashCommandBuilder;
    Active: boolean;
    Execute: (interaction: CommandInteraction) => Promise<void>;
    AdminOnly?: boolean;
    DMOnly?: boolean;
}

export class CommandsHandler{
    static Commands: Array<SlashCommand> = []

    static async Initialize() {
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
            this.Commands.push(CommandModule); // Optional: if you want to keep a list
        }

        const guildCommands = this.Commands.filter(c => !c.DMOnly);
        const dmCommands = this.Commands.filter(c => c.DMOnly);
        const rest = new REST({ version: "10" }).setToken(Config.TOKEN);
        try {
            ColorLog("&6&oRegistering slash commands...");
            await rest.put(
                Routes.applicationGuildCommands(Config.CLIENT_ID, Config.GUILD_ID),
                { body: guildCommands.map(c => c.Data.toJSON()) }
            );
            await rest.put(
                Routes.applicationCommands(Config.CLIENT_ID),
                { body: dmCommands.map(c => c.Data.toJSON()) }
            );
            ColorLog("&eSlash commands registered.");
        } catch (error) {
            console.error("Error registering commands:", error);
        }
    }

    static async Execute_Commands(interaction: CommandInteraction) {
        const User = interaction.user.id;
        const Command = this.Commands.find((cmd) => cmd.Data.name === interaction.commandName);
        if (!Command) {
          await interaction.reply({
            content: "Command not found.",
            ephemeral: true,
          });
          return;
        }
        if (Command.AdminOnly && !Config.Admins.includes(User)) {
            await interaction.reply({
            //   content: "This command is restricted to admins.",
              embeds: [Config.SpcialEmbeds.WarAdminCommand],
              ephemeral: true,
            });
            return;
        }
          await Command.Execute(interaction);
    }

    static async Execute_ContextMenu(interaction: CommandInteraction) {
        const command = this.Commands.find((cmd) => cmd.Data.name === interaction.commandName);
        if (!command) {
          await interaction.reply({
            content: "Command not found Context.",
            ephemeral: true,
          });
          return;
        }
        await command.Execute(interaction);
    }
}
