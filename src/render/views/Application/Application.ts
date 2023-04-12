import { AActor } from "@render/libs/AActor"
import { onMounted, onUnmounted } from "vue"

/**
 * 这个类和我在主进程挂到渲染进程的重名了 注意 只是重名了 没其他意义
 */
class Application extends AActor {
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
        Message.success("Together丨233")
    }
}

export { Application }