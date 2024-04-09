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
        setTimeout(async () => {
            await Renderer.NodeAddon.Automatic("SetMousePosition", { x: 100, y: 200 })
            await Renderer.NodeAddon.Automatic("SetButtonClick", { button: D.NodeAddon.MosueButton.Left })
            await Renderer.NodeAddon.Automatic("WriteText", { content: "ADASDASDASDASd" })
        }, 3000);
    }
}

export { Application }