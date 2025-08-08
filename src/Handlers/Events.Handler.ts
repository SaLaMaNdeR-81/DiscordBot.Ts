import Path from 'path'
import Fs from 'fs'

//# =============              =============
//#              ==============
//!              Events Handler 
//#              ==============
//# =============              =============

interface RouterInterface {
    Name: string;
    Description: string;
    Active: boolean;
    Initialize?: () => void;
}

const EventsList: RouterInterface[] = [];

const EventsHandler = () => {
    const EPath = Path.join(__dirname, "..", "Events");
    if (!Fs.existsSync(EPath)) return console.error("Events Directory Not Found");
    const RoutersFiles = Fs.readdirSync(EPath).filter(file => file.endsWith('.Event.ts'));
    for (let File of RoutersFiles) {
        const fileNameWithoutExt = File.replace(/\.ts$/, '');
        const RouteModule: RouterInterface = require(Path.join(EPath, fileNameWithoutExt)).default;
        if (!RouteModule) continue  
        
        if (!RouteModule.Active) continue;
        EventsList.push(RouteModule);
        RouteModule.Initialize?.();
    }
}

export { EventsList,EventsHandler };
