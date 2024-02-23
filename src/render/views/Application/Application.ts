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
            Renderer.Tray.Flash("new.ico")
        }, 3000);

        setTimeout(() => {
            Renderer.Tray.StopFlash("tray.ico")
        }, 10000);
    }
}

export { Application }