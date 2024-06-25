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
        export function SetAutostart(enable: boolean): Promise<void>

        /**
         * 打开自定义窗口
         */
        export function CreateCustomWindow(options: TSingleton.CustomWidgetOptions): Promise<void>
    }

    /**
     * 系统托盘
     */
    export namespace Tray {
        /**
         * 修改托盘图标 
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
        export function Listen(callback: (e: Record<string, unknown> | unknown | any) => void): void

        /**
         * 最小化
         */
        export function Min(): Promise<void>

        /**
         * 最大化或者恢复最大化之前状态
         */
        export function Max(): Promise<void>

        /**
         * 隐藏
         */
        export function Hide(): Promise<void>

        /**
         * 关闭
         */
        export function Close(): Promise<void>

        /**
         * 显示
         */
        export function Show(): Promise<void>

        /**
         * 设置在最上层
         */
        export function SetAlwaysOnTop(flag: boolean): Promise<void>

        /**
         * 窗口屏幕居中
         */
        export function Center(): Promise<void>

        /**
         * 设置窗口位置
         */
        export function SetPosition(position: { x: number, y: number }): Promise<void>

        /**
         * 设置窗口位置
         */
        export function GetPosition(): Promise<{ x: number, y: number }>

        /**
         * 调整大小
         */
        export function SetSize(size: { height: number; width: number; }): Promise<void>

        /**
         * 获取当前窗口的Bounds
         */
        export function GetBounds(): Promise<Electron.Rectangle>

        /**
         * 发送自定义消息
         */
        export function PostMessage(e: Record<string, unknown>): Promise<void>

        export function SetShadow(flag: boolean): Promise<void>

        export function SetIgnoreCursorEvents(flag: boolean): Promise<void>
    }

    /**
     * 屏幕
     */
    export namespace Screen {
        /**
         * 获取当前鼠标位置的屏幕
         */
        export function GetHoldCursor(): Promise<TSingleton.IScreen>

        /**
         * 获取所有屏幕
         */
        export function GetAll(): Promise<Array<TSingleton.IScreen>>

        /**
         * 获取主屏幕
         */
        export function GetPrimary(): Promise<TSingleton.IScreen>
    }

    /**
     * 窗口
     */
    export namespace Window {
        /**
         * 获取所有窗口
         */
        export function GetAll(): Promise<Array<TSingleton.IWindow>>
    }

    /**
     * 额外集成
     */
    export namespace Shell {
        /**
         * 播放提示音
         */
        export function Beep(): Promise<void>

        /**
         * 在文件管理器中打开路径
         */
        export function OpenInFolder(path: string): Promise<void>

        /**
         * 使用默认方式打开路径
         */
        export function OpenPathByDefault(path: string): Promise<void>
    }

    /**
     * 资源
     */
    export namespace Resource {

        /**
         * 通过名称获取文件路径 ( 仅限 Need 文件夹 ) 例如: Images/window.ico
         */
        export function GetPathByName(name: string): Promise<string>

        /**
         * 通过名称获取文件文件服务器路径 ( 仅限 Need 文件夹 ) 例如: Images/window.ico
         */
        export function GetFileByNameFromLocalServer(name: string): string

        /**
         * 从文件资源管理器选择资源
         */
        export function GetSelectResourcesPath(options?: TSingleton.SelectOptions): Promise<Array<string> | undefined>

        /**
         * 从文件资源管理器选择保存资源路径
         */
        export function GetSaveResourcesPath(options?: TSingleton.SaveOptions): Promise<Electron.SaveDialogReturnValue>

        /**
         * 判断路径是否存在 
         */
        export function IsPathExists(path: string): Promise<boolean>

        /**
         * 获取文件夹里所有文件列表 
         */
        export function ReadDirFiles(dir: string): Promise<Array<string>>

        /**
         * 创建文件夹 
         */
        export function CreateDir(dir: string): Promise<boolean>

        /**
         * 删除文件夹 
         */
        export function RemoveDir(dir: string): Promise<boolean>

        /**
         * 删除文件 
         */
        export function RemoveFile(path: string): Promise<boolean>

        /**
         * 重命名 
         */
        export function Rename(path: string, newPath: string): Promise<boolean>

        /**
         * 复制文件 
         */
        export function CopyFile(path: string, newPath: string): Promise<boolean>

        /**
         * 获取文件元数据 
         */
        export function GetFileMetadata(path: string): Promise<Record<string, unknown>>

        /**
         * 下载文件
         */
        export function Download(url: string): void

        /**
         * 将字符串写入文件
         */
        export function WriteStringToFile(path: string, str: string): Promise<boolean>

        /**
         * 将字符串追加到文件尾部( 默认换行 )
         */
        export function AppendStringToFile(path: string, str: string, newline?: boolean): Promise<boolean>

        /**
         * 读取文件内容转换为字符串
         */
        export function ReadStringFromFile(str: string): Promise<Record<string, unknown>>
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

    /**
     * 全局快捷键
     */
    export namespace GlobalShortcut {
        /**
         * 注册快捷键
         */
        export function Register(accelerator: Electron.Accelerator, callback: () => void): Promise<boolean>

        /**
         * 取消快捷键
         */
        export function Unregister(accelerator: Electron.Accelerator): Promise<void>

        /**
         * 是否已经注册快键键
         */
        export function IsRegistered(accelerator: Electron.Accelerator): Promise<boolean>

        /**
         * 取消所有快捷键
         */
        export function UnregisterAll(): Promise<void>
    }

    export namespace Simulate {
        /**
         * 鼠标移动
         */
        export function MouseMove(options: TSingleton.MouseMoveOptions): Promise<void>

        /**
         * 鼠标滚动
         */
        export function MouseScroll(options: TSingleton.MouseScrollOptions): Promise<void>

        /**
         * 鼠标按键按下
         */
        export function MouseDown(btn: TSingleton.MouseBtn): Promise<void>

        /**
         * 鼠标按键松开
         */
        export function MouseUp(btn: TSingleton.MouseBtn): Promise<void>

        /**
         * 鼠标按键点击
         */
        export function MouseClick(btn: TSingleton.MouseBtn): Promise<void>

        /**
         * 获取鼠标位置
         */
        export function GetMousePosition(): Promise<{ x: number, y: number }>
    }
}