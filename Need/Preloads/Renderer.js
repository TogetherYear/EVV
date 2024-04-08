const { ipcRenderer, clipboard } = require("electron")

const Renderer = {
    App: {
        Close: () => {
            return ipcRenderer.postMessage(`Renderer:App:Close`)
        },
        Relaunch: () => {
            return ipcRenderer.postMessage(`Renderer:App:Relaunch`)
        },
        IsAutostart: async () => {
            const enable = await ipcRenderer.invoke('Renderer:App:IsAutostart')
            return enable
        },
        SetAutostart: (enable) => {
            return ipcRenderer.postMessage(`Renderer:App:SetAutostart`, enable)
        }
    },
    Tray: {
        SetTrayIcon: (icon) => {
            return ipcRenderer.postMessage(`Renderer:Tray:Icon`, icon)
        },
        SetTrayTooltip: (tooltip) => {
            return ipcRenderer.postMessage(`Renderer:Tray:Tooltip`, tooltip)
        },
        Flash: (icon) => {
            return ipcRenderer.postMessage(`Renderer:Tray:Flash`, icon)
        },
        StopFlash: (icon) => {
            return ipcRenderer.postMessage(`Renderer:Tray:StopFlash`, icon)
        },
    },
    Widget: {
        Listen: (callback) => {
            return ipcRenderer.on("RendererMessage", (e, data) => {
                callback(data)
            })
        },
        Min: () => {
            return ipcRenderer.postMessage(`Renderer:Widget:Min`)
        },
        Max: () => {
            return ipcRenderer.postMessage(`Renderer:Widget:Max`)
        },
        Hide: () => {
            return ipcRenderer.postMessage(`Renderer:Widget:Hide`)
        },
        Show: () => {
            return ipcRenderer.postMessage(`Renderer:Widget:Show`)
        },
        SetSize: (size) => {
            return ipcRenderer.postMessage(`Renderer:Widget:Size`, size)
        },
        Center: () => {
            return ipcRenderer.postMessage(`Renderer:Widget:Center`)
        },
        SetPosition: (position) => {
            return ipcRenderer.postMessage(`Renderer:Widget:Position`, position)
        },
        GetBounds: async () => {
            const bounds = await ipcRenderer.invoke('Renderer:Widget:Bounds')
            return bounds
        },
        PostMessage: (e) => {
            return ipcRenderer.postMessage(`Renderer:Widget:Message`, e)
        }
    },
    Screen: {
        GetHoldCursor: async () => {
            const screen = await ipcRenderer.invoke('Renderer:Screen:Cursor')
            return screen
        },
        GetAll: async () => {
            const screens = await ipcRenderer.invoke('Renderer:Screen:All')
            return screens
        },
        GetPrimary: async () => {
            const screens = await ipcRenderer.invoke('Renderer:Screen:Primary')
            return screens
        },
    },
    Shell: {
        Beep: () => {
            return ipcRenderer.postMessage(`Renderer:Shell:Beep`)
        },
        OpenInFolder: (path) => {
            return ipcRenderer.postMessage(`Renderer:Shell:Folder`, path)
        },
        OpenPathByDefault: (path) => {
            return ipcRenderer.postMessage(`Renderer:Shell:Default`, path)
        },
    },
    Resource: {
        GetPathByName: async (name) => {
            const path = await ipcRenderer.invoke(`Renderer:Resource:Name`, name)
            return path
        },
        GetSelectResourcesPath: async (options) => {
            const path = await ipcRenderer.invoke(`Renderer:Resource:Select`, options)
            return path
        },
        GetSaveResourcesPath: async (options) => {
            const path = await ipcRenderer.invoke(`Renderer:Resource:Save`, options)
            return path
        },
        IsPathExists: async (path) => {
            const result = await ipcRenderer.invoke(`Renderer:Resource:Exists`, path)
            return result
        },
        ReadDirFiles: async (dir) => {
            const files = await ipcRenderer.invoke(`Renderer:Resource:Read`, dir)
            return files
        },
        CreateDir: async (dir) => {
            const result = await ipcRenderer.invoke(`Renderer:Resource:Create`, dir)
            return result
        },
        RemoveDir: async (dir) => {
            const result = await ipcRenderer.invoke(`Renderer:Resource:RemoveDir`, dir)
            return result
        },
        RemoveFile: async (path) => {
            const result = await ipcRenderer.invoke(`Renderer:Resource:RemoveFile`, path)
            return result
        },
        Rename: async (path, newPath) => {
            const result = await ipcRenderer.invoke(`Renderer:Resource:Rename`, path, newPath)
            return result
        },
        CopyFile: async (path, newPath) => {
            const result = await ipcRenderer.invoke(`Renderer:Resource:Copy`, path, newPath)
            return result
        },
        Download: (url) => {
            return ipcRenderer.postMessage(`Renderer:Resource:Download`, url)
        },
    },
    Clipboard: {
        WriteText: (text) => {
            return clipboard.writeText(text)
        },
        ReadText: () => {
            return clipboard.readText()
        },
    },
    GlobalShortcut: {
        Register: async (accelerator) => {
            const result = await ipcRenderer.invoke('Renderer:GlobalShortcut:Register', accelerator)
            return result
        },
        Unregister: (accelerator) => {
            return ipcRenderer.postMessage(`Renderer:GlobalShortcut:Unregister`, accelerator)
        },
        IsRegistered: async (accelerator) => {
            const result = await ipcRenderer.invoke('Renderer:GlobalShortcut:IsRegistered', accelerator)
            return result
        },
        UnregisterAll: () => {
            return ipcRenderer.postMessage(`Renderer:GlobalShortcut:UnregisterAll`)
        },
    },
    NodeAddon: {
        Automatic: async (options) => {
            const result = await ipcRenderer.invoke(`Renderer:NodeAddon:Automatic`, options)
            return result
        },
        Image: async (options) => {
            const result = await ipcRenderer.invoke(`Renderer:NodeAddon:Image`, options)
            return result
        },
        Monitor: async (options) => {
            const result = await ipcRenderer.invoke(`Renderer:NodeAddon:Monitor`, options)
            return result
        },
        Serve: async (options) => {
            const result = await ipcRenderer.invoke(`Renderer:NodeAddon:Serve`, options)
            return result
        },
        Wallpaper: async (options) => {
            const result = await ipcRenderer.invoke(`Renderer:NodeAddon:Wallpaper`, options)
            return result
        },
        Window: async (options) => {
            const result = await ipcRenderer.invoke(`Renderer:NodeAddon:Window`, options)
            return result
        },
    }
}

window.Renderer = Renderer