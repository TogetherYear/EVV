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

    enum AutomaticMethon {
        GetMousePosition = "GetMousePosition",
        SetMousePosition = "SetMousePosition",
        SetButtonClick = "SetButtonClick",
        SetButtonToggle = "SetButtonToggle",
        SetMouseScroll = "SetMouseScroll",
        GetColorFromPosition = "GetColorFromPosition",
        GetCurrentPositionColor = "GetCurrentPositionColor",
        WriteText = "WriteText",
        SetKeysToggle = "SetKeysToggle",
        SetKeysClick = "SetKeysClick",
    }

    enum ImageMethon {
        ConvertImageFormat = "ConvertImageFormat",
    }

    enum MonitorMethon {
        GetAllMonitors = "GetAllMonitors",
        GetMonitorFromPoint = "GetMonitorFromPoint",
        GetCurrentMouseMonitor = "GetCurrentMouseMonitor",
        GetPrimaryMonitor = "GetPrimaryMonitor",
    }

    enum ServeMethon {
        CreateStaticFileServe = "CreateStaticFileServe",
    }

    enum WallpaperMethon {
        GetWallpaper = "GetWallpaper",
        SetWallpaper = "SetWallpaper",
    }

    enum WindowMethon {
        GetAllWindows = "GetAllWindows",
    }

    export type AutomaticMethonType = `${AutomaticMethon}`

    export type ImageMethonType = `${ImageMethon}`

    export type MonitorMethonType = `${MonitorMethon}`

    export type ServeMethonType = `${ServeMethon}`

    export type WallpaperMethonType = `${WallpaperMethon}`

    export type WindowMethonType = `${WindowMethon}`

    export type NodeAddonMethonType = AutomaticMethonType | ImageMethonType | MonitorMethonType | ServeMethonType | WallpaperMethonType | WindowMethonType

}