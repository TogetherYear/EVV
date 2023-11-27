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
        Message = 'Message',
        SecondInstance = 'SecondInstance',
    }

    export enum IpcRendererWindow {
        Main = 'Main',
        Tray = 'Tray',
    }

    export interface IIpcRendererMessage {
        type: IpcRendererEvent,
        widgets?: Array<IpcRendererWindow>,
        [key: string]: any
    }

}
export { D }
