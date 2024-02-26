declare namespace NodeAddon {
    export namespace Automatic {
        export function GetMousePosition(): Point
        export function SetMousePosition(x: number, y: number): void
        export function SetButtonClick(button: MosueButton): void
        export function SetButtonToggle(button: MosueButton, down: boolean): void
        export function SetMouseScroll(direction: ScrollDirection, clicks: number): void
        export function GetColorFromPosition(x: number, y: number): Color
        export function GetCurrentPositionColor(): Color
        export function WriteText(content: string): void
        export function SetKeysToggle(keys: Array<ToggleKey>): void
        export function SetKeysClick(keys: Array<KeyboardKey>): void
        export const enum ScrollDirection {
            Down = 0,
            Up = 1
        }
        export const enum MosueButton {
            Left = 0,
            Middle = 1,
            Right = 2
        }
        export const enum KeyboardKey {
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
    }
    export namespace Image {
        export function ConvertImageFormat(originPath: string, convertPath: string, options: ConvertOptions): void
        export const enum ImageFormat {
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
        export const enum ImageFilter {
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

    }
    export namespace Monitor {
        export function GetAllMonitors(): Array<Monitor>
        export function GetMonitorFromPoint(x: number, y: number): Monitor
        export function GetCurrentMouseMonitor(): Monitor
        export function GetPrimaryMonitor(): Monitor
        export abstract class Monitor {
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
            Capture(path: string): boolean
        }
    }
    export namespace Serve {
        export function CreateStaticFileServe(path: string, onOpen: (...args: any[]) => any): void
    }
    export namespace Wallpaper {
        export function GetWallpaper(): string
        export function SetWallpaper(path: string, mode: WallpaperMode): void
        export const enum WallpaperMode {
            Center = 0,
            Crop = 1,
            Fit = 2,
            Span = 3,
            Stretch = 4,
            Tile = 5
        }
    }
    export namespace Window {
        export function GetAllWindows(): Array<Window>
        export abstract class Window {
            id: number
            title: string
            appName: string
            x: number
            y: number
            width: number
            height: number
            isMinimized: boolean
            isMaximized: boolean
            Capture(path: string): boolean
        }
    }
}