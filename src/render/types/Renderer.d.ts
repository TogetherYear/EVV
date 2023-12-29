declare namespace Renderer {
    /**
     * 内部调用事件分发 请勿使用
     */
    export function Listen(callback: (e: Record<string, unknown>) => void): void

    /**
     * 应用
     */
    export namespace App {
        /**
         * 关闭
         */
        export function Close(): void
    }

    /**
     * 窗口
     */
    export namespace Widget {
        /**
         * 最小化
         */
        export function Min(): void
        /**
         * 最大化或者恢复最大化之前状态
         */
        export function Max(): void
        /**
         * 隐藏
         */
        export function Hide(): void
        /**
         * 显示
         */
        export function Show(): void
        /**
         * 窗口屏幕居中
         */
        export function Center(): void
        /**
         * 设置窗口位置
         */
        export function SetPosition(position: { x: number, y: number }): void
        /**
         * 调整大小
         */
        export function Resize(size: { height: number; width: number; }): void
        /**
         * 获取当前窗口的Bounds
         */
        export function GetBounds(): Promise<Electron.Rectangle>
        /**
         * 发送自定义消息
         */
        export function PostMessage(e: Record<string, unknown>): Promise<Electron.Rectangle>
    }

    /**
     * 屏幕
     */
    export namespace Screen {
        /**
         * 获取当前鼠标位置的屏幕
         */
        export function GetHoldCursor(): Promise<Electron.Display>
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

    /**
     * 额外集成
     */
    export namespace Shell {
        /**
         * 播放提示音
         */
        export function Beep(): void
    }

    /**
     * 资源
     */
    export namespace Resource {
        /**
         * 通过名称获取文件路径
         */
        export function GetPathByName(name: string): Promise<string>
    }
}