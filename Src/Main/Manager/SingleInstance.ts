import { Time } from '@Libs/Time';
import { app } from 'electron';
import { WindowPool } from './WindowPool';
import { I } from '@Src/Instructions/I';

class SingleInstance {
    public Run() {
        const additionalData = { key: 'TSingleton', Time: Time.GetTime() };
        const lock = app.requestSingleInstanceLock(additionalData);
        if (!lock) {
            app.exit(0);
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
