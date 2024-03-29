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
        this.AddKey(D.IpcRendererEvent.Message)
        this.AddKey(D.IpcRendererEvent.SecondInstance)
    }

    private ListenEvents() {
        Renderer.Widget.Listen((e: any) => {
            this.OnMessage(e)
        })
    }

    private OnMessage(e: D.IpcRendererSendMessage) {
        if (e.type == 'Message') {
            Message.success(e.type)
            this.Emit(D.IpcRendererEvent.Message)
        }
        else if (e.type == 'SecondInstance') {
            Message.error('已关闭第二个实例')
            Renderer.Widget.Show()
            this.Emit(D.IpcRendererEvent.SecondInstance)
        }
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