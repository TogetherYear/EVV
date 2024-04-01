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
            this.ListenEvents()
            this.State()
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
    }

    private ListenEvents() {
        Renderer.Widget.Listen((e: any) => {
            this.OnMessage(e)
        })
    }

    private OnMessage(e: D.IpcRendererSendMessage) {
        if (e.type == D.IpcRendererEvent.SecondInstance) {
            Message.error('已关闭第二个实例')
            Renderer.Widget.Show()
        }
        this.Emit(e.type, e)
    }

    private async State() {
        if (location.href.indexOf("Application") != -1) {
            Renderer.Widget.SetSize({
                width: parseInt(localStorage.getItem("width") || '1000'),
                height: parseInt(localStorage.getItem("height") || '560')
            })
            Renderer.Widget.Center()
            window.addEventListener('resize', (e: UIEvent) => {
                localStorage.setItem("width", `${window.innerWidth}`)
                localStorage.setItem("height", `${window.innerHeight}`)
            })
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