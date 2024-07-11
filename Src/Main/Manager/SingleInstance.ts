import { Time } from '@Libs/Time'
import { app } from 'electron'
import { WindowPool } from './WindowPool'
import { D } from '@Decorators/D'

class SingleInstance {
    private constructor() { }

    private static instance = new SingleInstance()

    public static get Instance() {
        return this.instance
    }

    public Run() {
        const additionalData = { key: "TSingleton", Time: Time.GetTime() }
        const lock = app.requestSingleInstanceLock(additionalData)
        if (!lock) {
            app.exit(0)
        }
    }

    public OnSecondInstance() {
        WindowPool.Instance.PostMessage({ type: D.IpcRendererEvent.SecondInstance, widgets: [D.IpcRendererWindow.Main] })
    }
}

export { SingleInstance }