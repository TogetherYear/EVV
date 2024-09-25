import { fork, ChildProcess } from 'child_process';
import { ResourceLoad } from '@Main/Manager/ResourceLoad';
import * as fs from 'fs';
import { IM } from '@Main/Instructions/IM';

class ProcessPool {
    private pool = new Map<IM.ChildrenProcessType, ChildProcess>();

    public Run() {
        this.RunChildren();
    }

    public RegisterProcess(t: IM.ChildrenProcessType, p: ChildProcess) {
        this.pool.set(t, p);
    }

    public CancelProcess(t: IM.ChildrenProcessType) {
        this.pool.delete(t);
    }

    public GetProcess(t: IM.ChildrenProcessType) {
        return this.pool.get(t);
    }

    private RunChildren() {
        const children = fs.readdirSync(ResourceLoad.GetChildProcessesFolder());
        for (let c of children) {
            if (c.indexOf('.js') != -1) {
                const name = c.split('.js')[0];
                const type = this.TransformType(name);
                const process = fork(ResourceLoad.GetChildProcessesByName(name));
                process.on('message', (e: IM.IChildrenProcessReceiveMessage) => {
                    this.OnMessage({ ...e, type });
                });
                this.RegisterProcess(type, process);
            }
        }
    }

    private TransformType(e: string) {
        switch (e) {
            case 'Log':
                return IM.ChildrenProcessType.Log;
            case 'Push':
                return IM.ChildrenProcessType.Push;
            case 'Custom':
                return IM.ChildrenProcessType.Custom;
            default:
                return IM.ChildrenProcessType.Other;
        }
    }

    private GetPoolKV() {
        const result: Array<{ key: IM.ChildrenProcessType; value: ChildProcess }> = [];
        for (let p of this.pool) {
            result.push({ key: p[0], value: p[1] });
        }
        return result;
    }

    private OnMessage(e: IM.IChildrenProcessReceiveMessage & { type: IM.ChildrenProcessType }) {
        if (e.type === IM.ChildrenProcessType.Log) {
        } else if (e.type === IM.ChildrenProcessType.Push) {
        } else if (e.type === IM.ChildrenProcessType.Custom) {
        } else {
        }
    }

    public PostMessage(e: IM.ChildrenProcessSendMessage) {
        if (e.processes && e.processes.length != 0) {
            for (let p of e.processes) {
                const process = this.GetProcess(p);
                if (process) {
                    process.send(e);
                }
            }
        } else if (e.excludeProcesses && e.excludeProcesses.length != 0) {
            const need = this.GetPoolKV().filter((c) => (e.excludeProcesses || []).indexOf(c.key) === -1);
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
