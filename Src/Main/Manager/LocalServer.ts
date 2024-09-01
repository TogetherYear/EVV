import express from 'express';
import * as H from 'http';
import { ResourceLoad } from './ResourceLoad';
import * as core from 'express-serve-static-core';

/**
 * 本地服务器
 */
class LocalServer {
    private app!: core.Express;

    private server!: H.Server<typeof H.IncomingMessage, typeof H.ServerResponse>;

    public Run() {
        this.CreateServer();
    }

    private CreateServer() {
        this.app = express();
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Cross-Origin-Embedder-Policy', 'require-corp');
            res.header('Cross-Origin-Opener-Policy', 'same-origin');
            next();
        });

        this.SetHttpServer();

        this.SetStaticFile();

        this.app.set('port', 8676);
        this.server = H.createServer(this.app);
        this.server.listen(8676, '127.0.0.1');
        this.server.on('listening', () => {});
    }

    private SetHttpServer() {
        this.app.get('/Test', (req, res) => {
            res.write('Test');
            res.end();
        });
    }

    private SetStaticFile() {
        this.app.use('/Static', express.static(ResourceLoad.GetNeedFolder()));
    }
}

const LocalServerInstance = new LocalServer();

export { LocalServerInstance as LocalServer };
