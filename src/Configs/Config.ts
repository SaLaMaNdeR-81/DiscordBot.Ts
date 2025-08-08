//  const Config = require('./Config');
import EnvConfig from './env';

const Config = {

    TOKEN: EnvConfig.DISCORD_TOKEN,
    GUILD_ID: EnvConfig.GUILD_ID,
    CLIENT_ID: EnvConfig.CLIENT_ID,
    // PREFIX: EnvConfig.DISCORD_PREFIX,
    
    Bot:{
        NickName: "🌱𝐍𝐞𝐯𝐞𝐫𝐋𝐚𝐧𝐝", // 🌱𝐍𝐞𝐯𝐞𝐫𝐋𝐚𝐧𝐝
        Description: "A Simple DiscordBot powerd By .TypeScript",
        Author: "Salamander-81",
        Status: "dnd",
        EmbedColor: 0x00ff62,
    },

    Channels:{
        WELCOME : "",
        BOARDER : ""
    },

    Activitys: [
            "1️⃣ Activity 1",
            "2️⃣ Activity 2",
            "3️⃣ Activity 3",
            "4️⃣ Activity 4",
            "5️⃣ Activity 5",
            "6️⃣ Activity 6",
            "7️⃣ Activity 7",
    ]

}

export {Config};