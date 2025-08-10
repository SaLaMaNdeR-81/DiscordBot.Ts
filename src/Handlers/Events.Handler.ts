import Path from 'path'
import Fs from 'fs'

//# =============              =============
//#              ==============
//!              Events Handler 
//#              ==============
//# =============              =============

interface EventInterface {
    Name: string;
    Description: string;
    Active: boolean;
    Initialize?: () => void;
}

const EventsList: EventInterface[] = [];

const EventsHandlerr = () => {
    const Folder = Path.join(__dirname, "..", "Events");
    if (!Fs.existsSync(Folder)) return console.error("Events Directory Not Found");
    const EventFiles = Fs.readdirSync(Folder).filter(file => file.endsWith('.Event.ts'));
    for (const File of EventFiles) {
        const FixedFile = File.slice(0,-3) // Remove [.ts]
        const Module: EventInterface = require(Path.join(Folder, FixedFile)).default;
        if (!Module) continue  
        if (!Module.Active) continue;
        EventsList.push(Module);
        Module.Initialize?.();
    }
}

export class EventsHandler {
    static Events: Array<EventInterface> = [];
    static async Initialize() {
        const Folder = Path.join(__dirname, "..", "Events");
        if (!Fs.existsSync(Folder)) return console.error("Events Directory Not Found");
        const List = Fs.readdirSync(Folder).filter(file => file.endsWith('.Event.ts'));
        for (const File of List) {
            const FixedFile = File.slice(0,-3) // Remove [.ts]
            const Module: EventInterface = require(Path.join(Folder, FixedFile)).default;
            if (!Module || !Module.Name || !Module.Active) continue;
            this.Events.push(Module);
            if (typeof Module.Initialize === 'function') {
                try {
                    await Module.Initialize();
                } catch (error) {
                    console.error(`Error initializing event ${Module.Name}:`, error);
                }
            }
        }
    } 
}

export { EventsList,EventsHandlerr };
