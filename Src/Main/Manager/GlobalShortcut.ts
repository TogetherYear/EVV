import { globalShortcut } from 'electron'
import { WindowPool } from './WindowPool'
import { D } from '@Decorators/D'
import { EventSystem } from '@Libs/EventSystem'

class GlobalShortcut extends EventSystem {
    public Run() {

    }

    public Register(accelerator: Electron.Accelerator, callback: () => void) {
        if (!globalShortcut.isRegistered(accelerator)) {
            return globalShortcut.register(accelerator, () => {
                callback()
                WindowPool.PostMessage({
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

const GlobalShortcutInstance = new GlobalShortcut()

export { GlobalShortcutInstance as GlobalShortcut }