import { EventSystem } from "@libs/EventSystem"
import { useDialog, useMessage } from "naive-ui"
import { DialogApiInjection } from "naive-ui/lib/dialog/src/DialogProvider"
import { MessageApiInjection } from "naive-ui/lib/message/src/MessageProvider"

class Preload extends EventSystem {
    private constructor() { super() }

    private static instance: Preload = new Preload()

    public static get Instance() { return this.instance }

    private message: MessageApiInjection | null = null

    private dialog: DialogApiInjection | null = null

    public Run() {
        this.CreateNaive()
    }

    private CreateNaive() {
        if (!window.NE_Message) {
            this.message = useMessage();
            (window as any).NE_Message = this.message
        }
        if (!window.NE_Dialog) {
            this.dialog = useDialog();
            (window as any).NE_Dialog = this.dialog
        }
    }
}

export { Preload }