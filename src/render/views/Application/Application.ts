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
            this.Test()
        })
        onUnmounted(() => {
            this.Destroy()
        })
    }

    protected Destroy() {

    }

    public Test() {
        Renderer.GlobalShortcut.Register("Control+T")
        App.Instance.AddListen(D.IpcRendererEvent.GlobalShortcut, this, this.ONG)
        setTimeout(() => {
            Renderer.GlobalShortcut.Unregister("Control+T")
        }, 3000);
    }

    public ONG(e: D.IpcRendererSendMessage) {
        Debug.Log(e)
    }
}

export { Application }