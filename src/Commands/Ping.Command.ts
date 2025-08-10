import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { ButtonBuilder, ActionRowBuilder,ButtonStyle } from "discord.js";

import ButtonSystem from "../Components/Buttons/!Template.Button";

export default class CommandSystem {
    Active:boolean= true

    PingBtn = new ButtonBuilder()
        .setLabel('Ping')
        .setStyle(ButtonStyle.Danger)
        .setCustomId('Ping-Button')
        .setEmoji('🏓');
        
    row = new ActionRowBuilder()
        .addComponents(this.PingBtn)
        
    public readonly Data = new SlashCommandBuilder()
        .setName("ping")
        .setDescription("This is a template command for demonstration purposes.")

    public async Execute (interaction: CommandInteraction) {
        try {
            // await interaction.deferReply({ ephemeral: true });
            // await setTimeout(() => {}, 2000);
            await interaction.reply({
                // content: "Pong!",
                components: [ButtonSystem.Build()],
                // ephemeral: true,

            });
        } catch (error) {
            console.error("Error executing template command:", error);
            await interaction.reply({
                content: "There was an error executing the command.",
                ephemeral: true,
            });
        }
    }
}
