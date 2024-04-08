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

    export enum NodeAddonCommand {
        Automatic,
        Image,
        Monitor,
        Serve,
        Wallpaper,
        Window,
    }
}