import { D } from "@decorators/D"
import { Time } from "@libs/Time"
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

    private async OnSecondInstance(e: D.IpcRendererSendMessage) {
        if (e.type == D.IpcRendererEvent.SecondInstance) {
            Message.error('已关闭第二个实例')
            await Renderer.Widget.Show()
        }
    }

    private async State() {
        if (location.href.indexOf("Application") != -1) {
            await Renderer.Widget.SetSize({
                width: parseInt(localStorage.getItem("width") || '1000'),
                height: parseInt(localStorage.getItem("height") || '560')
            })
            await Renderer.Widget.Center()
            await Renderer.Widget.Show()
            window.addEventListener('resize', (e: UIEvent) => {
                localStorage.setItem("width", `${window.innerWidth}`)
                localStorage.setItem("height", `${window.innerHeight}`)
            })
        }
    }
}

export { Application }