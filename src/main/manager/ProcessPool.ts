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

    private pool = new Map<DM.ChildrenProcessType, UtilityProcess>()

    public Run() {
        this.RunChildren()
    }

    public RegisterProcess(t: DM.ChildrenProcessType, p: UtilityProcess) {
        this.pool.set(t, p)
    }

    public CancelProcess(t: DM.ChildrenProcessType) {
        this.pool.delete(t)
    }

    public GetProcess(t: DM.ChildrenProcessType) {
        return this.pool.get(t)
    }

    private RunChildren() {
        const children = fs.readdirSync(ResourceLoad.Instance.GetChildProcessesFolder())
        for (let c of children) {
            if (c.indexOf('.js') != -1) {
                const name = c.split('.js')[0]
                const type = this.TransformType(name)
                const process = utilityProcess.fork(ResourceLoad.Instance.GetChildProcessesByName(name))
                process.on('message', (e: DM.IChildrenProcessReceiveMessage) => {
                    this.OnMessage({ ...e, type })
                })
                this.RegisterProcess(type, process)
            }
        }
    }

    private TransformType(e: string) {
        switch (e) {
            case 'Log': return DM.ChildrenProcessType.Log;
            case 'Push': return DM.ChildrenProcessType.Push;
            default: return DM.ChildrenProcessType.Custom;
        }
    }

    private GetPoolKV() {
        const result: Array<{ key: DM.ChildrenProcessType, value: UtilityProcess }> = []
        for (let p of this.pool) {
            result.push({ key: p[0], value: p[1] })
        }
        return result
    }

    private OnMessage(e: DM.IChildrenProcessReceiveMessage & { type: DM.ChildrenProcessType }) {
        if (e.type == DM.ChildrenProcessType.Log) {

        }
        else if (e.type == DM.ChildrenProcessType.Push) {

        }
        else {

        }
        console.log(e)
    }

    public PostMessage(e: DM.ChildrenProcessSendMessage) {
        if (e.processes && e.processes.length != 0) {
            for (let p of e.processes) {
                const process = this.GetProcess(p)
                if (process) {
                    process.postMessage(e.send)
                }
            }
        }
        else if (e.excludeProcesses && e.excludeProcesses.length != 0) {
            const need = this.GetPoolKV().filter(c => (e.excludeProcesses || []).indexOf(c.key) == -1)
            for (let p of need) {
                p.value.postMessage(e.send)
            }
        }
        else {
            for (let p of this.pool) {
                p[1].postMessage(e.send)
            }
        }
    }
}

export { ProcessPool }