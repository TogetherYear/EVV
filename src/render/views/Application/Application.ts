import { D } from "@decorators/D"
import { App } from "@render/App"
import { AActor } from "@render/libs/AActor"
import { onMounted, onUnmounted } from "vue"

class Application extends AActor {
    public constructor() {
        super()
    }

    public InitStates() {
        return {

        }
    }

    public InitHooks() {

    }

    public Run() {
        onMounted(() => {
            this.ListenEvents()
            this.State()
        })
        onUnmounted(() => {
            this.Destroy()
        })
    }

    protected Destroy() {

    }

    private ListenEvents() {
        App.Instance.AddListen(D.IpcRendererEvent.SecondInstance, this, this.OnSecondInstance)
    }

    private OnSecondInstance(e: D.IpcRendererSendMessage) {
        if (e.type == D.IpcRendererEvent.SecondInstance) {
            Message.error('已关闭第二个实例')
            Renderer.Widget.Show()
        }
    }

    private async State() {
        if (location.href.indexOf("Application") != -1) {
            Renderer.Widget.SetSize({
                width: parseInt(localStorage.getItem("width") || '1000'),
                height: parseInt(localStorage.getItem("height") || '560')
            })
            Renderer.Widget.Center()
            Renderer.Widget.Show()
            window.addEventListener('resize', (e: UIEvent) => {
                localStorage.setItem("width", `${window.innerWidth}`)
                localStorage.setItem("height", `${window.innerHeight}`)
            })
        }
    }
}

export { Application }