import {config} from 'dotenv';
config();

type INodeENV = 'production' | 'test' | 'development';
interface IENV {
  DISCORD_TOKEN: string;
  GUILD_ID: string;
  CLIENT_ID: string;
  // NODE_ENV: INodeENV;
  // PORT: number;
  // MONGO_URI: string;
  // DB:{
  //   Host: string;
  //   User: string;
  //   Password:string;
  //   Database:string;
  // }
}

const ENV: IENV = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN as string,
  GUILD_ID: process.env.GUILD_ID as string,
  CLIENT_ID: process.env.CLIENT_ID as string,
  
  // Db config
  // DB:{
  //   Host: process.env.HOST as string,
  //   User: process.env.USER as string,
  //   Password: process.env.PASSWORD as string,
  //   Database: process.env.DATABASE as string
  // }
}

// lack of some env variable
// throw error

export default ENV;