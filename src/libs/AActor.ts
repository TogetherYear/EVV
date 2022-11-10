import { EventSystem } from "./EventSystem";

abstract class AActor extends EventSystem {
    constructor() { super() }

    public abstract InitStates(): any

    public abstract InitHooks(): void

    public abstract Run(): void

    protected abstract Destroy(): void
}

export { AActor }