import { protocol } from "electron"
import path from 'path'
/**
 * 自定义协议
 */
class CustomProtocol {
    private constructor() { }

    private static instance = new CustomProtocol()

    public static get Instance() {
        return this.instance
    }

    public Run() {
        this.GenerateFileProtocol()
    }

    private GenerateFileProtocol() {
        protocol.registerFileProtocol('atom', (request, callback) => {
            const url = request.url.substr(7)
            callback(decodeURI(path.normalize(url)))
        })
    }
}

export { CustomProtocol }