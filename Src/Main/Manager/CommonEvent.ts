import { nativeTheme } from 'electron';
import { I } from '@Src/Instructions/I';
import { Manager } from '@Main/Libs/Manager';

class CommonEvent extends Manager {
    public Run() {
        nativeTheme.on('updated', () => {
            this.ctx.WindowPool.PostMessage({
                type: I.IpcRendererEvent.ThemeUpdate,
                send: {
                    theme: nativeTheme.themeSource
                }
            });
        });
    }
}

export { CommonEvent };
