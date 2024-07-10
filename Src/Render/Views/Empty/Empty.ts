import { AActor } from "@Render/Libs/AActor"
import { onMounted, onUnmounted } from "vue"

class Empty extends AActor {
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
            Renderer.Widget.PostMessage({
                reason: "Empty"
            })
        })

        onUnmounted(() => {
            this.Destroy()
        })
    }

    protected Destroy() {

    }
}

export { Empty }