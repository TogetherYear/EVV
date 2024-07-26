import { protocol, net } from 'electron';

/**
 * 自定义协议
 */
class CustomProtocol {
    public fileProtocol = 'tfile';

    public Run() {
        this.GenerateFileProtocol();
    }

    private GenerateFileProtocol() {
        protocol.handle(this.fileProtocol, (request) => {
            return net.fetch('file://' + request.url.slice(this.fileProtocol.length));
        });
    }
}

const CustomProtocolInstance = new CustomProtocol();

export { CustomProtocolInstance as CustomProtocol };
