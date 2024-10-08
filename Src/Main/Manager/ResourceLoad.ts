import { app } from 'electron';
import path from 'path';
import { CustomProtocol } from '@Main/Manager/CustomProtocol';
import { Manager } from '@Main/Libs/Manager';

class ResourceLoad extends Manager {
    public Run() {}

    public GetPageByName(name: string) {
        return app.isPackaged ? `file://${path.join(__dirname, `../Render/index.html#/${name}`)}`.replaceAll('\\', '/') : `http://localhost:6768/#/${name}`;
    }

    public GetNeedFolder() {
        return app.isPackaged ? path.join(process.resourcesPath, `/Need`) : path.join(__dirname, `../../Need`);
    }

    public GetImageByName(name: string) {
        return `${this.GetNeedFolder()}/Images/${name}`;
    }

    public GetConfigByName(name: string) {
        return `${this.GetNeedFolder()}/Configs/${name}.json`;
    }

    public GetPreloadByName(name: string) {
        return `${this.GetNeedFolder()}/Preloads/${name}.js`;
    }

    public GetChildProcessesFolder() {
        return `${this.GetNeedFolder()}/ChildProcesses`;
    }

    public GetChildProcessesByName(name: string) {
        return `${this.GetChildProcessesFolder()}/${name}.js`;
    }

    /**
     * 渲染进程使用
     */
    public GetResourcePathByName(name: string) {
        return `${this.GetNeedFolder()}/${name}`.replace('file', CustomProtocol.fileProtocol);
    }
}

const ResourceLoadInstance = new ResourceLoad();

export { ResourceLoadInstance as ResourceLoad };
