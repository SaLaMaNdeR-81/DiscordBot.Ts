import {ContextMenuCommandBuilder,ApplicationCommandType,UserContextMenuCommandInteraction,EmbedBuilder,codeBlock,} from "discord.js";

export default class CommandSystem {
    Active:boolean= true
    AdminOnly = true
    DMOnly = false

    public readonly Data = new ContextMenuCommandBuilder()
        .setName("Template-T2")
        .setType(ApplicationCommandType.User)

    public async Execute  (interaction: UserContextMenuCommandInteraction) {
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
