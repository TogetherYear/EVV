import { EventSystem } from "@libs/EventSystem"

class App extends EventSystem {
    private constructor() { super() }

    private static instance: App = new App()

    public static get Instance() { return this.instance }


    public Run() {

    }
}

export { App }