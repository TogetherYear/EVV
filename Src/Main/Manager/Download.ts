import { session } from "electron"
import { ResourceLoad } from "./ResourceLoad"

/**
 * 下载管理器
 */
class Download {
    private constructor() { }

    private static instance = new Download()

    public static get Instance() {
        return this.instance
    }

    private get S() {
        return session.defaultSession
    }

    public Run() {
        this.S.setDownloadPath(ResourceLoad.Instance.GetDownloadsFolder())
        this.ListenEvents()
    }

    private ListenEvents() {
        this.S.on('will-download', (e, item) => {
            e.preventDefault()
        })
    }

    public DownloadFromUrl(url: string) {
        this.S.downloadURL(url)
    }
}

export { Download }