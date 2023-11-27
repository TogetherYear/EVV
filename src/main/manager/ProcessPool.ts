import { UtilityProcess, utilityProcess } from 'electron'
import { ResourceLoad } from '@main/manager/ResourceLoad'

class ProcessPool {
    private constructor() { }

    private static instance = new ProcessPool()

    public static get Instance() {
        return this.instance
    }

    private pool = new Map<string, UtilityProcess>()

    public Run() {
        this.RunLog()
    }

    private RunLog() {
        const log = utilityProcess.fork(ResourceLoad.Instance.GetChildProcessesByName('Log'))
        log.on('message', (e) => {
            console.log(e)
        })
        this.pool.set('Log', log)
    }
}

export { ProcessPool }