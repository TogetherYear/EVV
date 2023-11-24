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
            this.InitEvents()
        })

        onUnmounted(() => {
            this.Destroy()
        })
    }

    protected Destroy() {

    }

    private InitEvents() {
        this.CreateEvents()
        this.ListenEvents()
    }

    private CreateEvents() {
        this.AddKey(D.IpcRendererEvent.SecondInstance)
    }

    private ListenEvents() {
        Renderer.Ipc.On("RendererMessage", (e: any) => {
            this.OnMessage(e)
        })
    }

    private OnMessage(e: D.IIpcRendererMessage) {
        Debug.Log(e)
        if (e.type == 'SecondInstance') {
            this.Emit(D.IpcRendererEvent.SecondInstance)
        }
    }

    public override AddListen(key: D.IpcRendererEvent, scope: Object, callback: DR.AppMessageCallback, once?: boolean): void {
        super.AddListen(key, scope, callback, once)
    }

    public override RemoveListen(key: D.IpcRendererEvent, scope: Object, callback: DR.AppMessageCallback): void {
        super.RemoveListen(key, scope, callback)
    }
}

export { App }