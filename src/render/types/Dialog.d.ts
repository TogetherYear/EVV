export interface IDialog {
    destroyAll: () => void
    create: (...args: any) => void
    success: (...args: any) => void
    warning: (...args: any) => void
    error: (...args: any) => void
    info: (...args: any) => void
}

declare global {
    interface Window {
        NE_Dialog: IDialog
    }
}