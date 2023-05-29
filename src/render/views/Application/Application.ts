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

        })
        onUnmounted(() => {
            this.Destroy()
        })
    }

    protected Destroy() {

    }

    public Test() {
        // Message.success("Together丨233")

        Renderer.Edge.ExeFromCode({
            code: `
                    async (input) => { 
                        return ".NET Welcomes " + input.ToString(); 
                    }
                `,
            input: 'Together'
        }).then(res => {
            console.log(res)
        })
    }
}

export { Application }