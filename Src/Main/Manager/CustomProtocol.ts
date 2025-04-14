import { Manager } from '@Main/Libs/Manager';
import { protocol, net, app } from 'electron';
import { resolve } from 'path';

/**
 * 自定义协议
 */
class CustomProtocol extends Manager {
    public fileProtocol = 'tfile';

    public deepLinkProtocol = 'evv-chips';

    public Run() {
        this.GenerateFileProtocol();
        this.GenerateDeepLinkProtocol();
    }

    private GenerateFileProtocol() {
        protocol.handle(this.fileProtocol, (request) => {
            return net.fetch('file://' + request.url.slice(this.fileProtocol.length));
        });
    }

    private GenerateDeepLinkProtocol() {
        if (process.defaultApp) {
            if (process.argv.length >= 2) {
                app.setAsDefaultProtocolClient(this.deepLinkProtocol, process.execPath, [resolve(process.argv[1])]);
            }
        } else {
            app.setAsDefaultProtocolClient(this.deepLinkProtocol);
        }
    }
}

export { CustomProtocol };
