const { ipcRenderer, clipboard, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('Renderer', {
    Listen: (callback) => {
        return ipcRenderer.on('RendererMessage', (e, data) => {
            callback(data);
        });
    },

    App: {
        Close: async () => {
            const result = await ipcRenderer.invoke('Renderer:App:Close');
            return result;
        },
        Relaunch: async () => {
            const result = await ipcRenderer.invoke('Renderer:App:Relaunch');
            return result;
        },
        IsAutostart: async () => {
            const enable = await ipcRenderer.invoke('Renderer:App:IsAutostart');
            return enable;
        },
        SetAutostart: async (enable) => {
            const result = await ipcRenderer.invoke('Renderer:App:SetAutostart', enable);
            return result;
        },
        GetName: async () => {
            const result = await ipcRenderer.invoke('Renderer:App:GetName');
            return result;
        },
        CreateCustomWindow: async (options) => {
            const result = await ipcRenderer.invoke(`Renderer:App:CreateCustomWindow`, options);
            return result;
        }
    },

    Tray: {
        SetTrayIcon: async (icon) => {
            const result = await ipcRenderer.invoke('Renderer:Tray:Icon', icon);
            return result;
        },
        SetTrayTooltip: async (tooltip) => {
            const result = await ipcRenderer.invoke('Renderer:Tray:Tooltip', tooltip);
            return result;
        },
        Flash: async (icon) => {
            const result = await ipcRenderer.invoke('Renderer:Tray:Flash', icon);
            return result;
        },
        StopFlash: async (icon) => {
            const result = await ipcRenderer.invoke('Renderer:Tray:StopFlash', icon);
            return result;
        }
    },

    Widget: {
        Min: async () => {
            const result = await ipcRenderer.invoke('Renderer:Widget:Min');
            return result;
        },
        Max: async () => {
            const result = await ipcRenderer.invoke('Renderer:Widget:Max');
            return result;
        },
        IsFullscreen: async () => {
            const result = await ipcRenderer.invoke('Renderer:Widget:IsFullscreen');
            return result;
        },
        Hide: async () => {
            const result = await ipcRenderer.invoke('Renderer:Widget:Hide');
            return result;
        },
        Close: async () => {
            const result = await ipcRenderer.invoke('Renderer:Widget:Close');
            return result;
        },
        Destroy: async () => {
            const result = await ipcRenderer.invoke('Renderer:Widget:Destroy');
            return result;
        },
        SetAlwaysOnTop: async (flag) => {
            const result = await ipcRenderer.invoke('Renderer:Widget:SetAlwaysOnTop', flag);
            return result;
        },
        Show: async () => {
            const result = await ipcRenderer.invoke('Renderer:Widget:Show');
            return result;
        },
        SetSize: async (size) => {
            const result = await ipcRenderer.invoke('Renderer:Widget:SetSize', size);
            return result;
        },
        Center: async () => {
            const result = await ipcRenderer.invoke('Renderer:Widget:Center');
            return result;
        },
        SetPosition: async (position) => {
            const result = await ipcRenderer.invoke('Renderer:Widget:SetPosition', position);
            return result;
        },
        GetPosition: async () => {
            const result = await ipcRenderer.invoke('Renderer:Widget:GetPosition');
            return result;
        },
        GetBounds: async () => {
            const bounds = await ipcRenderer.invoke('Renderer:Widget:GetBounds');
            return bounds;
        },
        SetShadow: async (flag) => {
            const result = await ipcRenderer.invoke('Renderer:Widget:SetShadow', flag);
            return result;
        },
        SetIgnoreCursorEvents: async (flag) => {
            const result = await ipcRenderer.invoke('Renderer:Widget:SetIgnoreCursorEvents', flag);
            return result;
        },
        PostMessage: (e) => {
            return ipcRenderer.postMessage(`Renderer:Widget:PostMessage`, e);
        }
    },

    Shell: {
        Beep: async () => {
            const result = await ipcRenderer.invoke('Renderer:Shell:Beep');
            return result;
        },
        OpenInFolder: async (path) => {
            const result = await ipcRenderer.invoke('Renderer:Shell:OpenInFolder', path);
            return result;
        },
        OpenPathByDefault: async (path) => {
            const result = await ipcRenderer.invoke('Renderer:Shell:OpenPathByDefault', path);
            return result;
        }
    },

    Resource: {
        GetPathByName: async (name) => {
            const path = await ipcRenderer.invoke(`Renderer:Resource:GetPathByName`, name);
            return path;
        },
        GetFileByNameFromLocalServer: (name) => {
            const path = `http://localhost:8676/Static/${name}`;
            return path;
        },
        GetSelectResourcesPath: async (options) => {
            const path = await ipcRenderer.invoke(`Renderer:Resource:SelectResourcesPath`, options);
            return path;
        },
        GetSaveResourcesPath: async (options) => {
            const path = await ipcRenderer.invoke(`Renderer:Resource:GetSaveResourcesPath`, options);
            return path;
        },
        IsPathExists: async (path) => {
            const result = await ipcRenderer.invoke(`Renderer:Resource:IsPathExists`, path);
            return result;
        },
        ReadDirFiles: async (dir) => {
            const files = await ipcRenderer.invoke(`Renderer:Resource:ReadDirFiles`, dir);
            return files;
        },
        CreateDir: async (dir) => {
            const result = await ipcRenderer.invoke(`Renderer:Resource:CreateDir`, dir);
            return result;
        },
        RemoveDir: async (dir) => {
            const result = await ipcRenderer.invoke(`Renderer:Resource:RemoveDir`, dir);
            return result;
        },
        RemoveFile: async (path) => {
            const result = await ipcRenderer.invoke(`Renderer:Resource:RemoveFile`, path);
            return result;
        },
        Rename: async (path, newPath) => {
            const result = await ipcRenderer.invoke(`Renderer:Resource:Rename`, path, newPath);
            return result;
        },
        CopyFile: async (path, newPath) => {
            const result = await ipcRenderer.invoke(`Renderer:Resource:CopyFile`, path, newPath);
            return result;
        },
        GetFileMetadata: async (path) => {
            const result = await ipcRenderer.invoke(`Renderer:Resource:GetFileMetadata`, path);
            return result;
        },
        WriteStringToFile: async (path, str) => {
            const result = await ipcRenderer.invoke(`Renderer:Resource:WriteStringToFile`, path, str);
            return result;
        },
        AppendStringToFile: async (path, str, newline = true) => {
            const result = await ipcRenderer.invoke(`Renderer:Resource:AppendStringToFile`, path, str, newline);
            return result;
        },
        ReadStringFromFile: async (path) => {
            const result = await ipcRenderer.invoke(`Renderer:Resource:ReadStringFromFile`, path);
            return result;
        }
    },

    Clipboard: {
        WriteText: (text) => {
            return clipboard.writeText(text);
        },
        ReadText: () => {
            return clipboard.readText();
        }
    }
});
