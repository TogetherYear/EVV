declare namespace TSingleton {
    export type SelectOptions = {
        title?: string;
        multiple?: boolean;
        defaultPath?: string;
        directory?: boolean;
        filters?: Array<{
            extensions: string[];
            name: string;
        }>;
    };

    export type SaveOptions = {
        title?: string;
        defaultPath?: string;
        filters?: Array<{
            extensions: string[];
            name: string;
        }>;
    };

    export type CustomWidgetOptions = {
        label: string;
        url: string;
        width?: number;
        height?: number;
        frame?: boolean;
        backgroundColor?: string;
        alwaysOnTop?: boolean;
        transparent?: boolean;
        skipTaskbar?: boolean;
        icon?: string;
        preload?: string;
        show?: boolean;
    };

    export interface IScreen {
        id: number;
        width: number;
        height: number;
        isPrimary: boolean;
        x: number;
        y: number;
        /**
         * ( 仅限 Need 文件夹 和 png 格式 ) 例如: Images/Capture.png
         */
        Capture: (path: string) => Promise<string>;
    }

    export interface IWindow {
        id: number;
        name: string;
        screen: IScreen;
        width: number;
        height: number;
        isMinimized: boolean;
        x: number;
        y: number;
        /**
         * ( 仅限 Need 文件夹 和 png 格式 ) 例如: Images/Capture.png
         */
        Capture: (path: string) => Promise<string>;
    }

    export type MouseMoveOptions = {
        type: 'relative' | 'absolute';
        x: number;
        y: number;
    };

    export type MouseScrollOptions = {
        type: 'x' | 'y';
        length: number;
    };

    export type MouseBtn = 'Left' | 'Middle' | 'Right' | 'Back' | 'Forward';

    export type ImageFormat =
        | 'Webp'
        | 'Avif'
        | 'Png'
        | 'Jpeg'
        | 'Bmp'
        | 'Ico'
        | 'Tiff'
        | 'Pnm'
        | 'Tga'
        | 'Farbfeld';

    export type ImageTransformerOptions = {
        inputPath: string;
        outputPath: string;
        outputFormat: ImageFormat;
    };
}
