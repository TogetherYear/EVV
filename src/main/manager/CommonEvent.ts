import { nativeTheme } from 'electron'
import { WindowPool } from './WindowPool'
import { D } from '@decorators/D'

class CommonEvent {
    private constructor() { }

    private static instance = new CommonEvent()

    public static get Instance() {
        return this.instance
    }

    public Run() {
        nativeTheme.on("updated", () => {
            WindowPool.Instance.PostMessage({
                type: D.IpcRendererEvent.ThemeUpdate, send: {
                    theme: nativeTheme.themeSource
                }
            })
        })
    }
}

export { CommonEvent }