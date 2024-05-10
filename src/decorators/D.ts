namespace D {
    export function ClassDec() {
        return function <T extends new (...args: Array<any>) => Object>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args)
                    this.Hooks()
                }

                private Hooks() {

                }

            }
        }
    }

    export function FunctionDec() {
        return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
            const original = descriptor.value.bind(target)
            descriptor.value = () => {
                original()

            }
        }
    }

    export enum IpcRendererEvent {
        SecondInstance = 'SecondInstance',
        GlobalShortcut = 'GlobalShortcut',
        FileDrop = 'FileDrop',
        ThemeUpdate = 'ThemeUpdate'
    }

    export enum IpcRendererWindow {
        Main = 'Main',
        Tray = 'Tray',
        Other = 'Other',
    }

    export interface IIpcRendererReceiveMessage {
        [key: string]: unknown
    }

    export interface IIpcRendererAddon {
        methon: string,
        args?: Array<unknown>
    }

    export type IpcRendererSendMessage = {
        type: IpcRendererEvent,
        /**
         * 要发送消息的窗口 与 excludeWidgets 冲突 二者填一个 此参数优先级高
         */
        widgets?: Array<IpcRendererWindow>,
        /**
         * 不要发送消息的窗口 与 widgets 冲突 二者填一个
         */
        excludeWidgets?: Array<IpcRendererWindow>,
        send?: IIpcRendererSendMessage
    }

    export interface IIpcRendererSendMessage extends IIpcRendererReceiveMessage {

    }

    export enum NodeAddonCommand {
        Automatic,
        Image,
        Monitor,
        Wallpaper,
        Window,
    }

    export namespace NodeAddon {
        /**
         * 自动化
         */
        export type Automatic = {
            GetMousePosition: () => Point
            SetMousePosition: (x: number, y: number) => void
            SetButtonClick: (button: MosueButton) => void
            SetButtonToggle: (button: MosueButton, down: boolean) => void
            SetMouseScroll: (direction: ScrollDirection, clicks: number) => void
            GetColorFromPosition: (x: number, y: number) => Color
            GetCurrentPositionColor: () => Color
            WriteText: (content: string) => void
            SetKeysToggle: (keys: Array<ToggleKey>) => void
            SetKeysClick: (keys: Array<KeyboardKey>) => void
        }

        export enum ScrollDirection {
            Down = 0,
            Up = 1
        }
        export enum MosueButton {
            Left = 0,
            Middle = 1,
            Right = 2
        }
        export enum KeyboardKey {
            Num0 = 0,
            Num1 = 1,
            Num2 = 2,
            Num3 = 3,
            Num4 = 4,
            Num5 = 5,
            Num6 = 6,
            Num7 = 7,
            Num8 = 8,
            Num9 = 9,
            A = 10,
            B = 11,
            C = 12,
            D = 13,
            E = 14,
            F = 15,
            G = 16,
            H = 17,
            I = 18,
            J = 19,
            K = 20,
            L = 21,
            M = 22,
            N = 23,
            O = 24,
            P = 25,
            Q = 26,
            R = 27,
            S = 28,
            T = 29,
            U = 30,
            V = 31,
            W = 32,
            X = 33,
            Y = 34,
            Z = 35,
            Add = 36,
            Subtract = 37,
            Multiply = 38,
            Divide = 39,
            OEM2 = 40,
            Tab = 41,
            CapsLock = 42,
            Shift = 43,
            Control = 44,
            Alt = 45,
            Space = 46,
            Backspace = 47,
            Return = 48,
            Escape = 49,
            UpArrow = 50,
            DownArrow = 51,
            LeftArrow = 52,
            RightArrow = 53
        }
        export interface Point {
            x: number
            y: number
        }
        export interface Color {
            r: number
            g: number
            b: number
            a: number
        }
        export interface ToggleKey {
            value: KeyboardKey
            down: boolean
        }

        /**
         * 图片
         */
        export type Image = {
            ConvertImageFormat: (originPath: string, convertPath: string, options: ConvertOptions) => void
        }

        export enum ImageFormat {
            Png = 0,
            Jpeg = 1,
            Gif = 2,
            WebP = 3,
            Pnm = 4,
            Tiff = 5,
            Tga = 6,
            Dds = 7,
            Bmp = 8,
            Ico = 9,
            Hdr = 10,
            OpenExr = 11,
            Farbfeld = 12,
            Avif = 13,
            Qoi = 14
        }
        export enum ImageFilter {
            Nearest = 0,
            Triangle = 1,
            CatmullRom = 2,
            Gaussian = 3,
            Lanczos3 = 4
        }
        export interface ConvertOptions {
            format: ImageFormat
            filter: ImageFilter
            keepAspectRatio: boolean
            width: number
            height: number
        }

        /**
         * 显示器
         */
        export type Monitor = {
            GetAllMonitors: () => Array<IMonitor>
            GetMonitorFromPoint: (x: number, y: number) => IMonitor
            GetCurrentMouseMonitor: () => IMonitor
            GetPrimaryMonitor: () => IMonitor

        }

        export interface IMonitor {
            id: number
            name: string
            x: number
            y: number
            width: number
            height: number
            rotation: number
            scaleFactor: number
            frequency: number
            isPrimary: boolean
            /**
             * 此方法只在主进程可用 通过IPC通信返回给渲染进程不可使用
             */
            Capture(path: string): boolean
        }

        /**
         * 静态文件服务器
         */
        export type Serve = {
            CreateStaticFileServe: (path: string, onOpen: (...args: unknown[]) => unknown) => void
        }

        /**
         * 壁纸
         */
        export type Wallpaper = {
            GetWallpaper: () => string
            SetWallpaper: (path: string, mode: WallpaperMode) => void

        }

        export enum WallpaperMode {
            Center = 0,
            Crop = 1,
            Fit = 2,
            Span = 3,
            Stretch = 4,
            Tile = 5
        }

        /**
         * 窗口
         */
        export type Window = {
            GetAllWindows: () => Array<IWindow>

        }

        export interface IWindow {
            id: number
            title: string
            appName: string
            x: number
            y: number
            width: number
            height: number
            isMinimized: boolean
            isMaximized: boolean
            /**
             * 此方法只在主进程可用 通过IPC通信返回给渲染进程不可使用
             */
            Capture(path: string): boolean
        }
    }

}
export { D }
