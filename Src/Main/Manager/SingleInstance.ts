import { Time } from '@Libs/Time'
import { app } from 'electron'
import { WindowPool } from './WindowPool'
import { D } from '@Decorators/D'

class SingleInstance {
    public Run() {
        const additionalData = { key: "TSingleton", Time: Time.GetTime() }
        const lock = app.requestSingleInstanceLock(additionalData)
        if (!lock) {
            app.exit(0)
        }
    }

    public OnSecondInstance() {
        WindowPool.PostMessage({ type: D.IpcRendererEvent.SecondInstance, widgets: [D.IpcRendererWindow.Main] })
    }
}

const SingleInstanceInstance = new SingleInstance()

export { SingleInstanceInstance as SingleInstance }