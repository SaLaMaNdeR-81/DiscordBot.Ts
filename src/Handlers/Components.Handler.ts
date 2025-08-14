import Path from 'path'
import Fs from 'fs'
import { ButtonInteraction } from 'discord.js';
import { Config } from '../Configs/Config';

//# =============              =============
//#              ==============
//!             Buttons  Handler 
//#              ==============
//# =============              =============

type ButtonClassType = {
    Name: string;
    Active: boolean;
    AdminOnly: boolean;
    Execute: (interaction: ButtonInteraction) => Promise<void>;
};

export class ButtonHandler {
    static Buttons: Array<ButtonClassType> = [];

    static async Initialize() {
        const Folder = Path.join(__dirname, "..", "Components", "Buttons");
        if (!Fs.existsSync(Folder)) return console.error("Components/Buttons Directory Not Found");
        const List = Fs.readdirSync(Folder).filter(file => file.endsWith('.Button.ts'));
        for (const File of List) {
            const FixedFile = File.slice(0,-3) // Remove [.ts]
            const Module: ButtonClassType = require(Path.join(Folder, FixedFile)).default;
            if (!Module || !Module.Name || !Module.Active || typeof Module.Execute !== 'function') continue;
            this.Buttons.push(Module);
        }
    }

    static async Execute(interaction: ButtonInteraction) {
        const User = interaction.user.id;
        const button = this.Buttons.find(btn => btn.Name === interaction.customId);
        if (!button) {
            console.warn(`Button with ID ${interaction.customId} not found.`);
            return;
        }
        if (button.AdminOnly && !Config.Admins.includes(User)) {
            await interaction.reply({
              embeds: [Config.SpcialEmbeds.WarAdminCommand],
              ephemeral: true,
            });
            return;
        }
        try {
            await button.Execute(interaction);
        } catch (error) {
            console.error(`Error executing button ${button.Name}:`, error);
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({
                    content: "There was an error handling the button.",
                    ephemeral: true
                });
            }
        }
    }
}

//# =============              =============
//#              ==============
//!            Components Handler 
//#              ==============
//# =============              =============

// export { EventsList,EventsHandler };