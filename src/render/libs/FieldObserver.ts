interface IieldObserver {
    dom: HTMLElement,
    /**
     * 默认 true 只监听一次
     */
    once?: boolean,
    OnShow?: () => void,
    OnHide?: () => void,
}

class FieldObserver {
    constructor(options: IieldObserver) {
        this.options = options
        this.CreateObserver()
    }

    private options!: IieldObserver

    private observer: IntersectionObserver | null = null

    private isEnter = false

    private CreateObserver() {
        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].intersectionRatio <= 0) {
                this.Hide()
            }
            else {
                this.Show()
            }
        })
        this.observer.observe(this.options.dom)
    }

    private Show() {
        if (!this.isEnter) {
            this.isEnter = true
            this.options.OnShow && this.options.OnShow()
            if (this.options.once == undefined || this.options.once == true) {
                this.Destroy()
            }
        }

    }

    private Hide() {
        if (this.isEnter) {
            this.isEnter = false
            this.options.OnHide && this.options.OnHide()
        }
    }

    public Destroy() {
        if (this.observer) {
            this.observer.unobserve(this.options.dom)
            this.observer = null
        }
    }
}

export { FieldObserver }