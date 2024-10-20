import { globalShortcut } from 'electron';
import { Manager } from '@Main/Libs/Manager';

class GlobalShortcut extends Manager {
    public Run() {}

    public Register(accelerator: Electron.Accelerator, callback: () => void) {
        if (!globalShortcut.isRegistered(accelerator)) {
            return globalShortcut.register(accelerator, () => {
                callback();
            });
        }
        return true;
    }

    public Unregister(accelerator: Electron.Accelerator) {
        globalShortcut.unregister(accelerator);
    }

    public IsRegistered(accelerator: Electron.Accelerator) {
        return globalShortcut.isRegistered(accelerator);
    }

    public UnregisterAll() {
        globalShortcut.unregisterAll();
    }
}

const GlobalShortcutInstance = new GlobalShortcut();

export { GlobalShortcutInstance as GlobalShortcut };
