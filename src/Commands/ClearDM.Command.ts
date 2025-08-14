import { SlashCommandBuilder, CommandInteraction, DMChannel, TextChannel } from "discord.js";

export default class ClearDMCommand {
    Active = true;
    DMOnly = true;
    AutherOnly = false

    public readonly Data = new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Clear all bot messages in your DM.")
        .setDMPermission(true);

    public async Execute(interaction: CommandInteraction) {
        await interaction.deferReply({ ephemeral: true });

        let channel: DMChannel;

        if (interaction.guild) {
            return interaction.editReply({ content: "❌ This command works only in DMs." });
        }
        if (!interaction.channel || !interaction.channel.isDMBased()) {
            try {
                channel = await interaction.user.createDM();
            } catch (err) {
                console.error("Failed to open DM with user:", err);
                return interaction.editReply({ content: "❌ Cannot open DM with you." });
            }
        } else {
            channel = interaction.channel as DMChannel;
        }
        let Messages;
        try {
            Messages = await channel.messages.fetch({ limit: 100 });
        } catch (err) {
            console.error("Failed to fetch DM messages:", err);
            return interaction.editReply({ content: "❌ Cannot fetch DM messages." });
        }
        const botMessages = Messages.filter(m => m.author.id === interaction.client.user?.id);
        let deletedCount = 0;
        for (const [, msg] of botMessages) {
            try {
                await msg.delete();
                deletedCount++;
            } catch (err) {
                console.error(`Failed to delete DM message: ${msg.id}`, err);
            }
        }

        await interaction.editReply({
            content: `✅ Deleted ${deletedCount} bot messages in your DM.`
        });
    }
}
