import {
  SlashCommandBuilder,
  CommandInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("apply")
  .setDescription("Submit an application form");

export async function execute(interaction: CommandInteraction) {
  const modal = new ModalBuilder()
    .setCustomId("applicationModal")
    .setTitle("Application Form");

  const nameInput = new TextInputBuilder()
    .setCustomId("name")
    .setLabel("What's your name?")
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const reasonInput = new TextInputBuilder()
    .setCustomId("reason")
    .setLabel("Why do you want to join?")
    .setStyle(TextInputStyle.Paragraph);

  modal.addComponents(
    new ActionRowBuilder<TextInputBuilder>().addComponents(nameInput),
    new ActionRowBuilder<TextInputBuilder>().addComponents(reasonInput)
  );

  await interaction.showModal(modal);
}
