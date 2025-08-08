import {ContextMenuCommandBuilder,ApplicationCommandType,UserContextMenuCommandInteraction,EmbedBuilder,codeBlock,} from "discord.js";

import { Config } from "../../Configs/Config";

export const data = new ContextMenuCommandBuilder()
  .setName("Profile")
  .setType(ApplicationCommandType.User);

export async function execute(interaction: UserContextMenuCommandInteraction) {
  try {
    await interaction.deferReply({ ephemeral: true });

    const User = interaction.targetUser;
    const member = await interaction.guild?.members.fetch(interaction.targetUser.id); // or interaction.targetMember
    const joined = member?.joinedTimestamp;
    const Creation = Math.floor(User.createdTimestamp / 1000)
    const member_jtm = joined ? `<t:${Math.floor(joined / 1000)}:d> <t:${Math.floor(joined / 1000)}:t> **|** <t:${Math.floor(joined / 1000)}:R>` : "Unknown";
    const topRole = member?.roles.highest;

    const embed = new EmbedBuilder()
    .setAuthor({ name: User.tag, iconURL: User.displayAvatarURL() })
    .setTitle(`👤 | User information`)
      .setDescription(`<@${User.id}>\n <@&${topRole ? topRole.id : "unknown"}>`)
      .setThumbnail(User.displayAvatarURL())
      .setColor("#00ff62")
      .addFields(
        { name: `🆔 ID:`, value: codeBlock("ts", User.id), inline: true },
        { name: `📌Nickname :`, value: codeBlock("ts", User.username), inline: true },
        {name: `📅 | Creation Time :`,value: `<t:${Creation}:d> <t:${Creation}:t> **|** <t:${Creation}:R>`},
        { name: `📅 | Join Server :`, value: member_jtm , inline: false, },
      )
      .setFooter({
        text: `${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp();

    await interaction.editReply({
      // content: `👤 Profile of ${user.tag}`,
      embeds: [embed],
    });
  } catch (err) {
    console.error("❌ Error in Profile command:", err);
    if (interaction.isRepliable() && !interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: "Something went wrong while loading the profile.",
        ephemeral: true,
      });
    }
  }
}
