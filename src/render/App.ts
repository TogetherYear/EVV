import { D } from "@decorators/D"
import { DR } from "./decorators/DR"
import { AActor } from "./libs/AActor"
import { onMounted, onUnmounted } from "vue"

class App extends AActor {
    private constructor() { super() }

    private static instance: App = new App()

    public static get Instance() { return this.instance }

    public InitStates() {
        return {}
    }

    public InitHooks() {

    }

    public Run() {
        onMounted(() => {
            this.CreateEvents()
            this.FileDropHandle()
            Renderer.Widget.Listen(this.OnMessage.bind(this))
        })

        onUnmounted(() => {
            this.Destroy()
        })
    }

    protected Destroy() {

    }

    private CreateEvents() {
        this.AddKey(D.IpcRendererEvent.SecondInstance)
        this.AddKey(D.IpcRendererEvent.GlobalShortcut)
        this.AddKey(D.IpcRendererEvent.FileDrop)
    }

    private OnMessage(e: D.IpcRendererSendMessage) {
        this.Emit(e.type, e)
    }

    private FileDropHandle() {
        document.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.Emit(D.IpcRendererEvent.FileDrop, {
                type: D.IpcRendererEvent.FileDrop,
                send: {
                    files: e.dataTransfer?.files
                }
            })
        });
        document.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    }

    public override AddListen(key: D.IpcRendererEvent, scope: Object, callback: DR.AppMessageCallback, once?: boolean): void {
        super.AddListen(key, scope, callback, once)
    }

    public override RemoveListen(key: D.IpcRendererEvent, scope: Object, callback: DR.AppMessageCallback): void {
        super.RemoveListen(key, scope, callback)
    }

    public Emit(key: string, data: D.IpcRendererSendMessage): void {
        super.Emit(key, data)
    }
}

export { App }