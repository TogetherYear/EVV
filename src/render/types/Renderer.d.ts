export interface IVibe {
    Max: () => void,
}

declare global {
    interface Window {
        EN_Vibe: IVibe
    }
}