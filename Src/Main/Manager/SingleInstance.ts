import { Time } from '@Src/Utils/Time';
import { app } from 'electron';
import { I } from '@Src/Instructions/I';
import { Manager } from '@Main/Libs/Manager';

class SingleInstance extends Manager {
    public Run() {
        const additionalData = { key: 'TSingleton', Time: Time.GetTime() };
        const lock = app.requestSingleInstanceLock(additionalData);
        if (!lock) {
            app.exit(0);
        } else {
            app.on('second-instance', (event, commandLine, workingDirectory) => {
                const cmd = commandLine.pop() || '';
                if (cmd.indexOf(this.ctx.CustomProtocol.deepLinkProtocol) !== -1) {
                    this.OnDeepLink(cmd);
                } else {
                    this.OnSecondInstance();
                }
            });
        }
    }

    public OnSecondInstance() {
        this.ctx.WindowPool.PostMessage({
            type: I.IpcRendererEvent.SecondInstance,
            widgets: [I.IpcRendererWindow.Tray]
        });
    }

    public OnDeepLink(url: string) {
        this.ctx.WindowPool.PostMessage({
            type: I.IpcRendererEvent.DeepLink,
            widgets: [I.IpcRendererWindow.Tray],
            send: {
                url
            }
        });
    }
}

export { SingleInstance };
