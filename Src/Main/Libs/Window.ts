import { BrowserWindow } from 'electron';
import { Manager } from './Manager';

abstract class Window extends Manager {
    public constructor() {
        super();
    }

    public widget!: BrowserWindow;
}

export { Window };
