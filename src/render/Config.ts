function Browser() {
    function CB(): void {
        console.log('Browser')
    }

    function RB(): any {
        return 'Browser'
    }

    const Renderer = {
        widget: {
            Min: () => {
                return CB()
            },
            Max: () => {
                return CB()
            },
            Close: () => {
                return CB()
            },
            GetBounds: async () => {
                return RB()
            },
        },
        Ipc: {
            Send: (channel: string, ...args: Array<any>) => {
                return CB()
            },
            Invoke: (channel: string, ...args: Array<any>) => {
                return RB()
            },
        },
        Screen: {
            GetHoldCursor: async () => {
                return RB()
            }
        },
        Screenshot: {
            GetFocus: async () => {
                return RB()
            },
            GetByIndex: async (index: number) => {
                return RB()
            },
            GetAll: async () => {
                return RB()
            },
            GetEdit: async () => {
                return RB()
            }
        },
        Notification: {
            Show: async (options?: { title?: string, body?: string, silent?: boolean }) => {
                return RB()
            }
        },
        Shell: {
            Beep: () => {
                return CB()
            },
        }
    }

    window.Renderer = Renderer
}

function Electron() {
    window.process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
}

export { Browser, Electron }