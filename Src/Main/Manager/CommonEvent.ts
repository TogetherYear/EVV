import { nativeTheme } from 'electron';
import { WindowPool } from './WindowPool';
import { I } from '@Src/Instructions/I';

class CommonEvent {
    public Run() {
        nativeTheme.on('updated', () => {
            WindowPool.PostMessage({
                type: I.IpcRendererEvent.ThemeUpdate,
                send: {
                    theme: nativeTheme.themeSource
                }
            });
        });
    }
}

const CommonEventInstance = new CommonEvent();

export { CommonEventInstance as CommonEvent };
