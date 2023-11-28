import { UtilityProcess, utilityProcess } from 'electron'
import { ResourceLoad } from '@main/manager/ResourceLoad'
import * as fs from 'fs'
import { DM } from '@main/decorators/DM'

class ProcessPool {
    private constructor() { }

    private static instance = new ProcessPool()

    public static get Instance() {
        return this.instance
    }

    private pool = new Map<string, UtilityProcess>()

    public Run() {
        this.RunChildren()
    }

    private RunChildren() {
        const children = fs.readdirSync(ResourceLoad.Instance.GetChildProcessesFolder())
        for (let c of children) {
            if (c.indexOf('.js') != -1) {
                const name = c.split('.js')[0]
                const process = utilityProcess.fork(ResourceLoad.Instance.GetChildProcessesByName(name))
                process.on('message', (e: DM.IChildrenProcessMessage) => {
                    this.OnMessage(e)
                })
                this.pool.set(name, process)
            }
        }
    }

    private OnMessage(e: DM.IChildrenProcessMessage) {
        console.log(e)
    }
}

export { ProcessPool }