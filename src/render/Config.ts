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
            }
        },
        Ipc: {
            Send: (channel: string, ...args: Array<any>) => {
                return CB()
            },
            Invoke: (channel: string, ...args: Array<any>) => {
                return RB()
            },
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
    }

    window.Renderer = Renderer
}

function Electron() {
    window.process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
}

export { Browser, Electron }