import { EmbedBuilder } from "discord.js";

export const WarAdminCommand = new EmbedBuilder()
    .setColor("#FF0000")
    .setTitle("Warning: Admin Command")
    .setDescription("This command is restricted to war admins only.")
    .setFooter({ text: "Contact an admin for assistance." })
    .setTimestamp();