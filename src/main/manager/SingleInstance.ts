import { Time } from '@Libs/Time'
import { app } from 'electron'

class SingleInstance {
    private constructor() { }

    private static instance = new SingleInstance()

    public static get Instance() {
        return this.instance
    }

    public Run() {
        const additionalData = { key: "TSingleton", Time: Time.GetTime() }
        const lock = app.requestSingleInstanceLock(additionalData)
        if (!lock) {
            app.exit(0)
        }
    }
}

export { SingleInstance }