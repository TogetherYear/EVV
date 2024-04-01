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
            Renderer.Resource.Download("https://media.gq.com.tw/photos/633c040882546a96d39d7886/16:9/w_2560%2Cc_limit/FeHHz_naYAYMYzf.jpeg")
        }, 3000);
    }
}

export { Application }