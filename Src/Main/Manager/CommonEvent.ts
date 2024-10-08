import { nativeTheme } from 'electron';
import { WindowPool } from './WindowPool';
import { I } from '@Src/Instructions/I';
import { Manager } from '@Main/Libs/Manager';

class CommonEvent extends Manager {
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
