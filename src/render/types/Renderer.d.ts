declare namespace Renderer {
    /**
     * 应用
     */
    export namespace App {
        /**
         * 关闭
         */
        export function Close(): void

        /**
         * 重启
         */
        export function Relaunch(): void

        /**
         * 是否开机自启
         */
        export function IsAutostart(): Promise<boolean>

        /**
         * 设置是否开机自启
         */
        export function SetAutostart(enable: boolean): void
    }

    /**
     * 系统托盘
     */
    export namespace Tray {
        /**
         * 修改托盘图标 不能用Tauri转换后的地址
         */
        export function SetTrayIcon(icon: string): Promise<void>

        /**
         * 修改托盘提示文字
         */
        export function SetTrayTooltip(tooltip: string): Promise<void>

        /**
         * 托盘开始闪烁
         */
        export function Flash(icon: string): Promise<void>

        /**
         * 托盘停止闪烁
         */
        export function StopFlash(icon: string): Promise<void>
    }

    /**
     * 窗口
     */
    export namespace Widget {
        /**
         * 内部调用事件分发 请勿使用
         */
        export function Listen(callback: (e: Record<string, unknown>) => void): void
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
        export function SetSize(size: { height: number; width: number; }): void
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

        /**
         * 获取所有屏幕
         */
        export function GetAll(): Promise<Array<Electron.Display>>

        /**
         * 获取主屏幕
         */
        export function GetPrimary(): Promise<Electron.Display>
    }

    /**
     * 额外集成
     */
    export namespace Shell {
        /**
         * 播放提示音
         */
        export function Beep(): void

        /**
         * 在文件管理器中打开路径
         */
        export function OpenInFolder(path: string): void

        /**
         * 使用默认方式打开\路径
         */
        export function OpenPathByDefault(path: string): void
    }

    /**
     * 资源
     */
    export namespace Resource {
        /**
         * 通过名称获取文件路径 ( 仅限 Need 文件夹 ) 例如: Images/window.ico
         */
        export function GetPathByName(name: string): Promise<string>
    }

    /**
     * 剪切板
     */
    export namespace Clipboard {
        /**
         * 写入剪切板
         */
        export function WriteText(text: string): void

        /**
         * 读取剪切板
         */
        export function ReadText(): string
    }
}