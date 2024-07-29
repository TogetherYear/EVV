import { D } from '@Src/Instructions/D';

namespace DR {
    export type AppMessageCallback = (e: D.IpcRendererSendMessage) => void;

    export interface IHeaderBarOptionItem {
        type: string;
        icon: string;
        label: string;
    }
}
export { DR };
