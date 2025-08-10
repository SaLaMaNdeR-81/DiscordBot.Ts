import { ButtonInteraction, ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";

export default class ButtonSystem {
    static Name: string = "templateButton";
    static Lable: string = "Template Button";
    static Emoji: string = "🏓";
    static Active: boolean = true;

    static Build() {
        const button = new ButtonBuilder()
            .setCustomId(this.Name)
            .setLabel("Template Button")
            .setEmoji(this.Emoji)
            .setStyle(ButtonStyle.Primary);

        return new ActionRowBuilder<ButtonBuilder>().addComponents(button);
    }

    static async Execute(interaction: ButtonInteraction) {
        try {
            await interaction.reply({
                content: "You clicked the template button!",
                ephemeral: true
            });
        } catch (error) {
            console.error(`Error executing button ${this.Name}:`, error);
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({
                    content: "There was an error handling the button.",
                    ephemeral: true
                });
            }
        }
    }
}
