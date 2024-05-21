declare namespace TSingleton {
    export type SelectOptions = {
        title?: string,
        multiple?: boolean,
        defaultPath?: string,
        directory?: boolean,
        filters?: Array<{
            extensions: string[];
            name: string;
        }>
    }

    export type SaveOptions = {
        title?: string,
        defaultPath?: string,
        filters?: Array<{
            extensions: string[];
            name: string;
        }>
    }

    export type CustomWidgetOptions = {
        label: string,
        url: string,
        width?: number,
        height?: number,
        frame?: boolean,
        backgroundColor?: string,
        alwaysOnTop?: boolean,
        transparent?: boolean,
        skipTaskbar?: boolean,
        icon?: string,
        preload?: string,
        show?: boolean
    }
}