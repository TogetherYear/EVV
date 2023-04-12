import { EventSystem } from "@libs/EventSystem";
import { BrowserWindow } from "electron";

abstract class TWindow extends EventSystem {
    public constructor() {
        super()
    }

    public widget!: BrowserWindow
}

export { TWindow }