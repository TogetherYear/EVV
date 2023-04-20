declare namespace Renderer {
    export namespace widget {
        export const id: number
    }

    export const ipcRenderer: Electron.IpcRenderer

    export function Screenshot(): Promise<Buffer>;
}