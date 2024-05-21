const { ipcRenderer, clipboard } = require("electron")

class Renderer {
    static instance = new Renderer()

    static get Instance() {
        return this.instance
    }

    globalShortcutEvents = new Map()

    get App() {
        return {
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
        }
    }

    get Tray() {
        return {
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
        }
    }

    get Widget() {
        return {
            Listen: (callback) => {
                return ipcRenderer.on("RendererMessage", (e, data) => {
                    if (data.type == 'GlobalShortcut' && this.globalShortcutEvents.has(data.send.accelerator)) {
                        this.globalShortcutEvents.get(data.send.accelerator)()
                    }
                    callback(data)
                })
            },
            Min: async () => {
                const result = await ipcRenderer.invoke('Renderer:Widget:Min')
                return result
            },
            Max: async () => {
                const result = await ipcRenderer.invoke('Renderer:Widget:Max')
                return result
            },
            Hide: async () => {
                const result = await ipcRenderer.invoke('Renderer:Widget:Hide')
                return result
            },
            Close: async () => {
                const result = await ipcRenderer.invoke('Renderer:Widget:Close')
                return result
            },
            SetAlwaysOnTop: async (flag) => {
                const result = await ipcRenderer.invoke('Renderer:Widget:Top', flag)
                return result
            },
            Show: async () => {
                const result = await ipcRenderer.invoke('Renderer:Widget:Show')
                return result
            },
            SetSize: async (size) => {
                const result = await ipcRenderer.invoke('Renderer:Widget:Size', size)
                return result
            },
            Center: async () => {
                const result = await ipcRenderer.invoke('Renderer:Widget:Center')
                return result
            },
            SetPosition: async (position) => {
                const result = await ipcRenderer.invoke('Renderer:Widget:Position', position)
                return result
            },
            GetBounds: async () => {
                const bounds = await ipcRenderer.invoke('Renderer:Widget:Bounds')
                return bounds
            },
            PostMessage: (e) => {
                return ipcRenderer.postMessage(`Renderer:Widget:Message`, e)
            }
        }
    }

    get Screen() {
        return {
            GetHoldCursor: async () => {
                const screen = await ipcRenderer.invoke('Renderer:Screen:Cursor')
                return this.Screen.TransformScreen(screen)
            },
            GetAll: async () => {
                const screens = await ipcRenderer.invoke('Renderer:Screen:All')
                return screens.map(s => this.Screen.TransformScreen(s))
            },
            GetPrimary: async () => {
                const screen = await ipcRenderer.invoke('Renderer:Screen:Primary')
                return this.Screen.TransformScreen(screen)
            },
            TransformScreen: (screen) => {
                return {
                    ...screen,
                    Capture: async (path) => {
                        const result = await ipcRenderer.invoke('Renderer:Screen:Capture', screen.id, path)
                        return result
                    }
                }
            }
        }
    }

    get Window() {
        return {
            GetAll: async () => {
                const windows = await ipcRenderer.invoke('Renderer:Window:All')
                return windows.map(w => this.Window.TransformWindow(w))
            },
            TransformWindow: (window) => {
                return {
                    ...window,
                    screen: this.Screen.TransformScreen(window.screen),
                    Capture: async (path) => {
                        const result = await ipcRenderer.invoke('Renderer:Window:Capture', window.id, path)
                        return result
                    }
                }
            }
        }
    }

    get Shell() {
        return {
            Beep: () => {
                return ipcRenderer.postMessage(`Renderer:Shell:Beep`)
            },
            OpenInFolder: (path) => {
                return ipcRenderer.postMessage(`Renderer:Shell:Folder`, path)
            },
            OpenPathByDefault: (path) => {
                return ipcRenderer.postMessage(`Renderer:Shell:Default`, path)
            },
        }
    }

    get Resource() {
        return {
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
        }
    }

    get Clipboard() {
        return {
            WriteText: (text) => {
                return clipboard.writeText(text)
            },
            ReadText: () => {
                return clipboard.readText()
            },
        }
    }

    get GlobalShortcut() {
        return {
            Register: async (accelerator, callback) => {
                const result = await ipcRenderer.invoke('Renderer:GlobalShortcut:Register', accelerator)
                if (result) {
                    this.globalShortcutEvents.set(accelerator, callback)
                }
                return result
            },
            Unregister: (accelerator) => {
                this.globalShortcutEvents.delete(accelerator)
                return ipcRenderer.postMessage(`Renderer:GlobalShortcut:Unregister`, accelerator)
            },
            IsRegistered: async (accelerator) => {
                const result = await ipcRenderer.invoke('Renderer:GlobalShortcut:IsRegistered', accelerator)
                return result
            },
            UnregisterAll: () => {
                this.globalShortcutEvents.clear()
                return ipcRenderer.postMessage(`Renderer:GlobalShortcut:UnregisterAll`)
            },
        }
    }

    get Tool() {
        return {
            CreateSuspendScreenshotWidget: () => {
                return ipcRenderer.postMessage(`Renderer:Tool:Suspend`)
            }
        }
    }
}

window.Renderer = Renderer.Instance

window['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true