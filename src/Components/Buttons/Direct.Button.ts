import { ButtonInteraction, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } from "discord.js";
import { Config } from "../../Configs/Config";

export default class ButtonSystem {
    static Name: string = "DirectMessage";
    static Lable: string = "Send DM";
    static Emoji: string = "1405329525474070620";
    static Active: boolean = true;
    static AdminOnly:boolean = true

    static Build() {
        const button = new ButtonBuilder()
            .setCustomId(this.Name)
            .setLabel(this.Lable)
            .setEmoji(this.Emoji)
            .setStyle(ButtonStyle.Primary);

        return new ActionRowBuilder<ButtonBuilder>().addComponents(button);
    }

    static Embed = new EmbedBuilder()
    .setAuthor({name: "Direct Message Button",iconURL: "https://cdn.discordapp.com/emojis/1405329525474070620.png"})
    .setColor(Config.Bot.EmbedColor)
    // .setThumbnail("https://cdn.discordapp.com/emojis/1405329525474070620.png")
    // .setTitle("Direct Message")
    .setDescription("Click the button below to receive a direct message from the bot.")
    .setFooter({text: "This is a private message."});

    static async Execute(interaction: ButtonInteraction) {
        try {
            await interaction.user.send({
                content: "📩 This is a private message just for you!",
                embeds: [this.Embed],
                // components: [this.Build()],
            });
            await interaction.reply({
                content: "I sent you a DM! 📬",
                ephemeral: true
            });
        } catch (error) {
            console.error(`Error executing button ${this.Name}:`, error);
            await interaction.reply({
                content: "❌ Could not send you a DM. Please check your privacy settings.",
                ephemeral: true
            });
        }
    }
}
