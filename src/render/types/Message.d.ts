export interface IMessage {
    info: (content: string, ...args: any) => void
    success: (content: string, ...args: any) => void
    warning: (content: string, ...args: any) => void
    error: (content: string, ...args: any) => void
    loading: (content: string, ...args: any) => void
    destroyAll: () => void
}

declare global {
    interface Window {
        NE_Message: IMessage
    }
}