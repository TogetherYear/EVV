declare namespace Renderer {
    /**
     * 窗口
     */
    export namespace widget {
        /**
         * 当前渲染进程窗口的唯一id
         */
        export const id: number
    }

    /**
     * 进程通信
     */
    export namespace Ipc {
        /**
         * 发送 不需要回应
         */
        export function Send(channel: string, ...args: any[]): void
        /**
         * 发送 需要回应
         */
        export function Invoke(channel: string, ...args: any[]): Promise<any>
    }

    /**
     * 截屏
     */
    export namespace Screenshot {
        /**
         * 获取当前鼠标位置的屏幕
         */
        export function GetFocus(): Promise<Buffer>
        /**
         * 根据索引获取
         */
        export function GetByIndex(index: number): Promise<Buffer>
        /**
         * 获取所有屏幕
         */
        export function GetAll(): Promise<Array<Buffer>>
    }
}