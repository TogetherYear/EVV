import { AActor } from "@libs/AActor"
import { onMounted, onUnmounted } from "vue"

class Vessel extends AActor {
    public constructor() { super() }

    public InitStates() {
        return {}
    }

    public InitHooks() {

    }

    public Run() {
        onMounted(() => {

        })
        onUnmounted(() => {
            this.Destroy()
        })
    }

    protected Destroy() {

    }

    public Test() {
        General.Widget.Max()
        Message.success("Together丨233")
    }
}

export { Vessel }