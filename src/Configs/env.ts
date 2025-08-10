import {config} from 'dotenv';
config();

type INodeENV = 'production' | 'test' | 'development';
interface IENV {
  DISCORD_TOKEN: string;
  GUILD_ID: string;
  CLIENT_ID: string;
  
}

const ENV: IENV = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN as string,
  GUILD_ID: process.env.GUILD_ID as string,
  CLIENT_ID: process.env.CLIENT_ID as string,
  
}

export default ENV;