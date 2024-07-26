import { session } from 'electron';
import { ResourceLoad } from './ResourceLoad';

/**
 * 下载管理器
 */
class Download {
    private get S() {
        return session.defaultSession;
    }

    public Run() {
        this.S.setDownloadPath(ResourceLoad.GetDownloadsFolder());
        this.ListenEvents();
    }

    private ListenEvents() {
        this.S.on('will-download', (e, item) => {
            e.preventDefault();
        });
    }

    public DownloadFromUrl(url: string) {
        this.S.downloadURL(url);
    }
}

const DownloadInstance = new Download();

export { DownloadInstance as Download };
