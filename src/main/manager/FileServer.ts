import express from 'express'
import * as H from 'http'
import { ResourceLoad } from './ResourceLoad'

/**
 * 文件服务器
 */
class FileServer {
    private constructor() { }

    private static instance = new FileServer()

    public static get Instance() {
        return this.instance
    }

    private server!: H.Server<typeof H.IncomingMessage, typeof H.ServerResponse>

    public Run() {
        this.CreateServer()
    }

    private CreateServer() {
        const e = express()
        e.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', "*")
            res.header('Access-Control-Allow-Methods', 'GET,POST')
            res.header('Access-Control-Allow-Headers', 'Content-Type')
            res.header('Access-Control-Allow-Credentials', 'true')
            res.header("Cross-Origin-Embedder-Policy", "require-corp");
            res.header("Cross-Origin-Opener-Policy", "same-origin");
            next()
        })
        e.use(express.static(ResourceLoad.Instance.GetExtraFolder()))
        e.set('port', 8676)
        this.server = H.createServer(e)
        this.server.listen(8676, '127.0.0.1')
        this.server.on('listening', () => {
            console.log(`FileServer:8676`)
        })
    }
}

export { FileServer }