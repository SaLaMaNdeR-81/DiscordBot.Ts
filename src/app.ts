import { Events, ActivityType, Interaction } from "discord.js";

import EnvConfig from "./Configs/env";
import { Config } from "./Configs/Config";
import { client as Client } from "./Configs/Client";

import { EventsHandler } from "./Handlers/Events.Handler";
import { CommandsHandler } from "./Handlers/Commands.Handler";
import { ButtonHandler } from "./Handlers/Components.Handler";

export class App {
  constructor() {
    // CommandsHandler();
    CommandsHandler();
    EventsHandler.Initialize();
    ButtonHandler.Initialize();
  }

  public listen() {
    Client.login(Config.TOKEN);
  }
}
