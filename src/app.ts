import { Events, ActivityType, Interaction } from "discord.js";

import EnvConfig from "./Configs/env";
import { Config } from "./Configs/Config";
import { client as Client } from "./Configs/Client";

import { EventsList, EventsHandler } from "./Handlers/Events.Handler";
import { commands, CommandsHandler } from "./Handlers/Commands.Handler";
import { NewCommandsHandler } from "./Handlers/NewCommands.Handler";

export class App {
  constructor() {
    // CommandsHandler();
    NewCommandsHandler();
    EventsHandler();
  }

  public listen() {
    Client.login(Config.TOKEN);
  }
}
