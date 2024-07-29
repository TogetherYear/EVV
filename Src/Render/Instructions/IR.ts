import { I } from '@Src/Instructions/I';

namespace IR {
    export type AppMessageCallback = (e: I.IpcRendererSendMessage) => void;

    export interface IHeaderBarOptionItem {
        type: string;
        icon: string;
        label: string;
    }
}
export { IR };
