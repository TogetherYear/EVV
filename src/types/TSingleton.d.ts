declare namespace TSingleton {
    export type SelectOptions = {
        title?: string,
        multiple?: boolean,
        defaultPath?: string,
        directory?: boolean,
        filters?: Array<{
            extensions: string[];
            name: string;
        }>
    }

    export type SaveOptions = {
        title?: string,
        defaultPath?: string,
        filters?: Array<{
            extensions: string[];
            name: string;
        }>
    }

    export type AutomaticMethonType = "GetMousePosition" |
        "SetMousePosition" |
        "SetButtonClick" |
        "SetButtonToggle" |
        "SetMouseScroll" |
        "GetColorFromPosition" |
        "GetCurrentPositionColor" |
        "WriteText" |
        "SetKeysToggle" |
        "SetKeysClick"

    export type ImageMethonType = "ConvertImageFormat"

    export type MonitorMethonType = "GetAllMonitors" |
        "GetMonitorFromPoint" |
        "GetCurrentMouseMonitor" |
        "GetPrimaryMonitor"

    export type WallpaperMethonType = "GetWallpaper" |
        "SetWallpaper"

    export type WindowMethonType = "GetAllWindows"

    export type NodeAddonMethonType = AutomaticMethonType | ImageMethonType | MonitorMethonType | WallpaperMethonType | WindowMethonType
}