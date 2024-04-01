import { protocol, net } from "electron"

/**
 * 自定义协议
 */
class CustomProtocol {
    private constructor() { }

    private static instance = new CustomProtocol()

    public fileProtocol = 'tfile'

    public static get Instance() {
        return this.instance
    }

    public Run() {
        this.GenerateFileProtocol()
    }

    private GenerateFileProtocol() {
        protocol.handle(this.fileProtocol, (request) => {
            return net.fetch('file://' + request.url.slice(this.fileProtocol.length))
        })
    }
}

export { CustomProtocol }