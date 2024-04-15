import { D } from "@decorators/D"
import { App } from "@render/App"
import { AActor } from "@render/libs/AActor"
import { onMounted, onUnmounted } from "vue"

class Application extends AActor {
    public constructor() { super() }

    public InitStates() {
        return {}
    }

    public InitHooks() {

    }

    public Run() {
        onMounted(() => {
            this.ListenEvents()
            this.State()
            this.Test()
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
            window.addEventListener('resize', (e: UIEvent) => {
                localStorage.setItem("width", `${window.innerWidth}`)
                localStorage.setItem("height", `${window.innerHeight}`)
            })
        }
    }

    public Test() {
        setTimeout(async () => {
            // await Renderer.NodeAddon.Automatic("SetMousePosition", { x: 100, y: 200 })
            // await Renderer.NodeAddon.Automatic("SetButtonClick", { button: D.NodeAddon.MosueButton.Left })
            // await Renderer.NodeAddon.Automatic("WriteText", { content: "ADASDASDASDASd" })

            // Renderer.Resource.GetFileMetadata("D:/Web/Test.json").then(res => {
            //     Debug.Log(res)
            // })
        }, 3000);
    }
}

export { Application }