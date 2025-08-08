import { SlashCommandBuilder, CommandInteraction } from "discord.js";

export default class CommandSystem {
    Active:boolean= false


    public readonly Data = new SlashCommandBuilder()
        .setName("template")
        .setDescription("This is a template command for demonstration purposes.")

    public async Execute (interaction: CommandInteraction) {
        try {
            await interaction.reply("This is a template command response.");
        } catch (error) {
            console.error("Error executing template command:", error);
            await interaction.reply({
                content: "There was an error executing the command.",
                ephemeral: true,
            });
        }
    }
}
