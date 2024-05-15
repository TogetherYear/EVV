import { globalShortcut } from 'electron'
import { WindowPool } from './WindowPool'
import { D } from '@decorators/D'
import { EventSystem } from '@libs/EventSystem'

class GlobalShortcut extends EventSystem {
    private constructor() {
        super()
    }

    private static instance = new GlobalShortcut()

    public static get Instance() {
        return this.instance
    }

    public Run() {

    }

    public Register(accelerator: Electron.Accelerator, callback: () => void) {
        if (!globalShortcut.isRegistered(accelerator)) {
            return globalShortcut.register(accelerator, () => {
                callback()
                WindowPool.Instance.PostMessage({
                    type: D.IpcRendererEvent.GlobalShortcut,
                    send: { accelerator }
                })
            })
        }
        return true
    }

    public Unregister(accelerator: Electron.Accelerator) {
        globalShortcut.unregister(accelerator)
    }

    public IsRegistered(accelerator: Electron.Accelerator) {
        return globalShortcut.isRegistered(accelerator)
    }

    public UnregisterAll() {
        globalShortcut.unregisterAll()
    }
}

export { GlobalShortcut }