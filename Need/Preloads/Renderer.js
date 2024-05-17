const { ipcRenderer, clipboard } = require("electron")

const globalShortcutEvents = new Map()

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
        },
        CreateCustomWindow: async (options) => {
            const result = await ipcRenderer.invoke(`Renderer:App:CreateCustomWindow`, options)
            return result
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
                if (data.type == 'GlobalShortcut' && globalShortcutEvents.has(data.send.accelerator)) {
                    globalShortcutEvents.get(data.send.accelerator)()
                }
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
        GetFileByNameFromLocalServer: (name) => {
            const path = `http://localhost:8676/${name}`
            return path
        },
        GetSelectResourcesPath: async (options) => {
            const path = await ipcRenderer.invoke(`Renderer:Resource:SelectResourcesPath`, options)
            return path
        },
        GetSaveResourcesPath: async (options) => {
            const path = await ipcRenderer.invoke(`Renderer:Resource:SaveResourcesPath`, options)
            return path
        },
        IsPathExists: async (path) => {
            const result = await ipcRenderer.invoke(`Renderer:Resource:Exists`, path)
            return result
        },
        ReadDirFiles: async (dir) => {
            const files = await ipcRenderer.invoke(`Renderer:Resource:ReadDirFiles`, dir)
            return files
        },
        CreateDir: async (dir) => {
            const result = await ipcRenderer.invoke(`Renderer:Resource:CreateDir`, dir)
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
            const result = await ipcRenderer.invoke(`Renderer:Resource:CopyFile`, path, newPath)
            return result
        },
        GetFileMetadata: async (path) => {
            const result = await ipcRenderer.invoke(`Renderer:Resource:GetFileMetadata`, path)
            return result
        },
        Download: (url) => {
            return ipcRenderer.postMessage(`Renderer:Resource:Download`, url)
        },
        WriteStringToFile: async (path, str) => {
            const result = await ipcRenderer.invoke(`Renderer:Resource:WriteStringToFile`, path, str)
            return result
        },
        AppendStringToFile: async (path, str, newline = true) => {
            const result = await ipcRenderer.invoke(`Renderer:Resource:AppendStringToFile`, path, str, newline)
            return result
        },
        ReadStringFromFile: async (path) => {
            const result = await ipcRenderer.invoke(`Renderer:Resource:ReadStringFromFile`, path)
            return result
        }
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
        events: new Map(),
        Register: async (accelerator, callback) => {
            const result = await ipcRenderer.invoke('Renderer:GlobalShortcut:Register', accelerator)
            if (result) {
                globalShortcutEvents.set(accelerator, callback)
            }
            return result
        },
        Unregister: (accelerator) => {
            globalShortcutEvents.delete(accelerator)
            return ipcRenderer.postMessage(`Renderer:GlobalShortcut:Unregister`, accelerator)
        },
        IsRegistered: async (accelerator) => {
            const result = await ipcRenderer.invoke('Renderer:GlobalShortcut:IsRegistered', accelerator)
            return result
        },
        UnregisterAll: () => {
            globalShortcutEvents.clear()
            return ipcRenderer.postMessage(`Renderer:GlobalShortcut:UnregisterAll`)
        },
    },
}

window.Renderer = Renderer

window['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'