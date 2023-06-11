class GlobalShortcut {
    private constructor() { }

    private static instance = new GlobalShortcut()

    public static get Instance() {
        return this.instance
    }

    public Run() {

    }
}

export { GlobalShortcut }