import { Time } from '@Src/Utils/Time';
import { app } from 'electron';
import { WindowPool } from './WindowPool';
import { I } from '@Src/Instructions/I';
import { Manager } from '@Main/Libs/Manager';
import { CustomProtocol } from './CustomProtocol';

class SingleInstance extends Manager {
    public Run() {
        const additionalData = { key: 'TSingleton', Time: Time.GetTime() };
        const lock = app.requestSingleInstanceLock(additionalData);
        if (!lock) {
            app.exit(0);
        } else {
            app.on('second-instance', (event, commandLine, workingDirectory) => {
                const cmd = commandLine.pop() || '';
                if (cmd.indexOf(CustomProtocol.deepLinkProtocol) !== -1) {
                    this.OnDeepLink(cmd);
                } else {
                    this.OnSecondInstance();
                }
            });
        }
    }

    public OnSecondInstance() {
        WindowPool.PostMessage({
            type: I.IpcRendererEvent.SecondInstance,
            widgets: [I.IpcRendererWindow.Tray]
        });
    }

    public OnDeepLink(url: string) {
        WindowPool.PostMessage({
            type: I.IpcRendererEvent.DeepLink,
            widgets: [I.IpcRendererWindow.Tray],
            send: {
                url
            }
        });
    }
}

const SingleInstanceInstance = new SingleInstance();

export { SingleInstanceInstance as SingleInstance };
