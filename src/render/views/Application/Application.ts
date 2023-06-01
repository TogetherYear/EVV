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
        Renderer.Screenshot.GetEdit().then(res => {
            console.log(res)
        })
        // Renderer.Notification.Show({
        //     title: 'Together',
        //     body: '一条简短的通知一条简短的通知一条简短的通知一条简短的通知一条简短的通知一条简短的通知一条简短的通知一条简短的通知',
        // }).then((type) => {
        //     console.log(type)
        // })
        // Renderer.Shell.Beep()
        // Renderer.Screenshot.GetFocus().then(res => {
        //     console.log(res)
        // })
        Message.success("Together丨233")
    }
}

export { Application }