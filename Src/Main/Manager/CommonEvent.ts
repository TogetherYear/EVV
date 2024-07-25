import { nativeTheme } from 'electron'
import { WindowPool } from './WindowPool'
import { D } from '@Decorators/D'

class CommonEvent {
    public Run() {
        nativeTheme.on("updated", () => {
            WindowPool.PostMessage({
                type: D.IpcRendererEvent.ThemeUpdate, send: {
                    theme: nativeTheme.themeSource
                }
            })
        })
    }
}

const CommonEventInstance = new CommonEvent()

export { CommonEventInstance as CommonEvent }