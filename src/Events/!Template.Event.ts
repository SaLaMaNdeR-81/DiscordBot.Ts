// import { UserController } from '../controller/user.controller';
import { Events, ActivityType, Interaction } from "discord.js";

import EnvConfig from '../Configs/env';
import { Config } from "../Configs/Config";
import {client as Client} from '../Configs/Client'

// const router = Router();

export default class EventSystem{
    static Name:string="Template"
    static Description:string=""
    static Active:Boolean=false

    static Initialize():void{
        // Client.on('ready',(Client)=>{
        //     console.log(`Logged in as ${Client.user.tag}!`);
        //     // Client.user.setActivity(Config.Activitys[Math.floor(Math.random() * Config.Activitys.length)], { type: ActivityType.Playing });
        //     Client.user.setActivity("Author: Salamander-81 ", { type: ActivityType.Custom });
        //     Client.user.setStatus(Config.Bot.Status as "online" | "idle" | "dnd" | "invisible");
        //     Client.user.setUsername(Config.Bot.NickName);
        // });
    }
    
}

const Callback = new EventSystem()
// export default Callback


