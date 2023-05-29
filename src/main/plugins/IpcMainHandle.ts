import { ipcMain, screen } from "electron"
import Screenshot from 'screenshot-desktop'
import Edge from 'electron-edge-js'

/**
 * 主线程 Ipc 监听 
 */
class IpcMainHandle {
    private constructor() { }

    private static instance: IpcMainHandle = new IpcMainHandle()

    public static get Instance(): IpcMainHandle {
        return this.instance
    }

    public Run() {
        this.ListenMainWindowIpc()
    }

    private ListenMainWindowIpc() {
        ipcMain.handle(`Tool:Screenshot:All`, async (e) => {
            const buffers = await Screenshot.all()
            return buffers
        })

        ipcMain.handle(`Tool:Screenshot:Index`, async (e, index: number) => {
            const list = await Screenshot.listDisplays()
            const buffer = await Screenshot({ format: 'png', screen: list[index].id })
            return buffer
        })

        ipcMain.handle(`Tool:Screenshot:Focus`, async (e) => {
            const current = screen.getDisplayNearestPoint(screen.getCursorScreenPoint())
            const list = await Screenshot.listDisplays()
            const id = list.find(l => l.left == current.bounds.x && l.top == current.bounds.y)?.id
            const buffer = await Screenshot({ format: 'png', screen: id })
            return buffer
        })

        ipcMain.handle(`Tool:Edge:Code`, async (e, options: { code: string, input: any }) => {
            const output = await new Promise((resolve, reject) => {
                const clr = Edge.func(`${options.code}`)
                clr(options.input, (error, result) => {
                    if (error) throw error
                    resolve(result)
                })
            })
            return output
        })
    }
}

export { IpcMainHandle }
