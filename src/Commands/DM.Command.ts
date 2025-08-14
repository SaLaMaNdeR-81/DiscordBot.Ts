import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { ButtonBuilder, ActionRowBuilder,ButtonStyle } from "discord.js";

import ButtonSystem from "../Components/Buttons/Direct.Button";

export default class CommandSystem {
    Active:boolean= true
    AdminOnly = true

    public readonly Data = new SlashCommandBuilder()
        .setName("direct")
        .setDescription("Send a direct message to the user")

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
