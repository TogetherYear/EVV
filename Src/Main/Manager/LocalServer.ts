import express from 'express';
import * as core from 'express-serve-static-core';
import { Manager } from '@Main/Libs/Manager';

/**
 * 本地服务器
 */
class LocalServer extends Manager {
    public port = 34290;

    private app!: core.Express;

    public Run() {
        this.CreateServer();
    }

    private CreateServer() {
        this.app = express();

        this.app.use(express.json())

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

        this.app.listen(this.port,'127.0.0.1',()=>{

        })
    }

    private SetHttpServer() {
        this.app.get('/test', (req, res) => {
            res.write('Test');
            res.end();
        });
    }

    private SetStaticFile() {
        this.app.use('/static', express.static(this.ctx.ResourceLoad.GetNeedFolder()));
    }
}

export { LocalServer };
