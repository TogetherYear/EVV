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
        setTimeout(() => {

        }, 3000);
    }
}

export { Application }