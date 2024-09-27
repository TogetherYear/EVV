import { Time } from '@Src/Utils/Time';
import { app } from 'electron';
import { WindowPool } from './WindowPool';
import { I } from '@Src/Instructions/I';
import { Manager } from '@Main/Libs/Manager';

class SingleInstance extends Manager {
    public Run() {
        const additionalData = { key: 'TSingleton', Time: Time.GetTime() };
        const lock = app.requestSingleInstanceLock(additionalData);
        if (!lock) {
            app.exit(0);
        } else {
            app.on('second-instance', () => {
                this.OnSecondInstance();
            });
        }
    }

    public OnSecondInstance() {
        WindowPool.PostMessage({
            type: I.IpcRendererEvent.SecondInstance,
            widgets: [I.IpcRendererWindow.Main]
        });
    }
}

const SingleInstanceInstance = new SingleInstance();

export { SingleInstanceInstance as SingleInstance };
