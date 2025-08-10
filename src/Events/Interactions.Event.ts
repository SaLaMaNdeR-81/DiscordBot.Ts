// import { UserController } from '../controller/user.controller';
import { Events, ActivityType, Interaction } from "discord.js";

import EnvConfig from '../Configs/env';
import { Config } from "../Configs/Config";
import {client as Client} from '../Configs/Client'
import { CommandsHandler ,Commands } from "../Handlers/Commands.Handler";
import { ButtonHandler } from "../Handlers/Components.Handler";

// const router = Router();

export default class EventSystem{
    static Name:string="Interactions"
    static Description:string=""
    static Active:Boolean=true

    static Initialize():void{
        Client.on(Events.InteractionCreate, async (interaction: Interaction) => {
      try {
        // Slash Commands
        if (interaction.isChatInputCommand()) {
          const command = Commands.find((cmd) => cmd.Data.name === interaction.commandName);
          if (!command) {
            await interaction.reply({
              content: "Command not found.",
              ephemeral: true,
            });
            return;
          }

          await command.Execute(interaction);
        }

        // User Context Menu Commands
        if (interaction.isUserContextMenuCommand()) {
          const command = Commands.find(
            (cmd) => cmd.Data.name === interaction.commandName
          );
          if (!command) {
            await interaction.reply({
              content: "Command not found Context.",
              ephemeral: true,
            });
            return;
          }

          await command.Execute(interaction);
        }

        // ButtonHandler Interactions
        if (interaction.isButton()) {
          await ButtonHandler.Execute(interaction);
        }

      } catch (error) {
        console.error("❌ Error handling interaction:", error);
        if (interaction.isRepliable()) {
          await interaction.reply({
            content: "There was an error executing the command.",
            ephemeral: true,
          });
        }
      }
    });
    }
    
}

const Callback = new EventSystem()
// export default Callback


