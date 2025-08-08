import { SlashCommandBuilder, CommandInteraction, GuildMember, VoiceBasedChannel } from "discord.js";
import { joinVoiceChannel } from "@discordjs/voice";

export const data = new SlashCommandBuilder()
  .setName("join-to-me")
  .setDescription("Join your current voice channel");

export async function execute(interaction: CommandInteraction) {
  const member = interaction.member as GuildMember;

  const voiceChannel = member.voice.channel as VoiceBasedChannel | null;

  if (!voiceChannel) {
    return interaction.reply({
      content: "❌ You must be in a voice channel first!",
      ephemeral: true,
    });
  }

  try {
    joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      selfDeaf: false, // or true if you want the bot deaf
    });

    await interaction.reply({
      content: `✅ Joined ${voiceChannel.name}`,
      ephemeral: true,
    });
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "⚠️ Failed to join your voice channel.",
      ephemeral: true,
    });
  }
}
