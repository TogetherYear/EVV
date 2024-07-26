import { fork, ChildProcess } from 'child_process';
import { ResourceLoad } from '@Main/Manager/ResourceLoad';
import * as fs from 'fs';
import { DM } from '@Main/Decorators/DM';

class ProcessPool {
    private pool = new Map<DM.ChildrenProcessType, ChildProcess>();

    public Run() {
        this.RunChildren();
    }

    public RegisterProcess(t: DM.ChildrenProcessType, p: ChildProcess) {
        this.pool.set(t, p);
    }

    public CancelProcess(t: DM.ChildrenProcessType) {
        this.pool.delete(t);
    }

    public GetProcess(t: DM.ChildrenProcessType) {
        return this.pool.get(t);
    }

    private RunChildren() {
        const children = fs.readdirSync(ResourceLoad.GetChildProcessesFolder());
        for (let c of children) {
            if (c.indexOf('.js') != -1) {
                const name = c.split('.js')[0];
                const type = this.TransformType(name);
                const process = fork(ResourceLoad.GetChildProcessesByName(name));
                process.on('message', (e: DM.IChildrenProcessReceiveMessage) => {
                    this.OnMessage({ ...e, type });
                });
                this.RegisterProcess(type, process);
            }
        }
    }

    private TransformType(e: string) {
        switch (e) {
            case 'Log':
                return DM.ChildrenProcessType.Log;
            case 'Push':
                return DM.ChildrenProcessType.Push;
            case 'Custom':
                return DM.ChildrenProcessType.Custom;
            default:
                return DM.ChildrenProcessType.Other;
        }
    }

    private GetPoolKV() {
        const result: Array<{ key: DM.ChildrenProcessType; value: ChildProcess }> = [];
        for (let p of this.pool) {
            result.push({ key: p[0], value: p[1] });
        }
        return result;
    }

    private OnMessage(e: DM.IChildrenProcessReceiveMessage & { type: DM.ChildrenProcessType }) {
        if (e.type == DM.ChildrenProcessType.Log) {
        } else if (e.type == DM.ChildrenProcessType.Push) {
        } else if (e.type == DM.ChildrenProcessType.Custom) {
        } else {
        }
    }

    public PostMessage(e: DM.ChildrenProcessSendMessage) {
        if (e.processes && e.processes.length != 0) {
            for (let p of e.processes) {
                const process = this.GetProcess(p);
                if (process) {
                    process.send(e);
                }
            }
        } else if (e.excludeProcesses && e.excludeProcesses.length != 0) {
            const need = this.GetPoolKV().filter(
                (c) => (e.excludeProcesses || []).indexOf(c.key) == -1
            );
            for (let p of need) {
                p.value.send(e);
            }
        } else {
            for (let p of this.pool) {
                p[1].send(e);
            }
        }
    }
}

const ProcessPoolInstance = new ProcessPool();

export { ProcessPoolInstance as ProcessPool };
