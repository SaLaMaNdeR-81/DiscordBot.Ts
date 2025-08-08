// import { UserController } from '../controller/user.controller';
import { Events, ActivityType, Interaction } from "discord.js";

import EnvConfig from '../Configs/env';
import { Config } from "../Configs/Config";
import {client as Client} from '../Configs/Client'
import { ColorLog } from "../Models/Colors";

// const router = Router();

export default class EventSystem{
    static Name:string="Ready"
    static Description:string="Ready Event"
    static Active:Boolean=true

    static Initialize():void{
        Client.on('ready',(Client)=>{
            ColorLog(`&b&lLogged in as &f&l[ &r&c${Client.user.username} &f&l]`);
            // Client.user.setActivity(Config.Activitys[Math.floor(Math.random() * Config.Activitys.length)], { type: ActivityType.Playing });
            Client.user.setActivity("Author: Salamander-81 ", { type: ActivityType.Custom });
            Client.user.setStatus(Config.Bot.Status as "online" | "idle" | "dnd" | "invisible");
            Client.user.setUsername(Config.Bot.NickName);
        });
    }
    
}

const Callback = new EventSystem()
// export default Callback


