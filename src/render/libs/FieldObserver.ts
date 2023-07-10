interface IieldObserver {
    dom: HTMLElement,
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
                this.OnHide()
            }
            else {
                this.OnShow()
            }
        })
        this.observer.observe(this.options.dom)
    }

    private OnShow() {
        if (!this.isEnter) {
            this.isEnter = true
            this.options.OnShow && this.options.OnShow()
            if (this.options.once == undefined || this.options.once == true) {
                this.observer?.unobserve(this.options.dom)
                this.observer = null
            }
        }

    }

    private OnHide() {
        if (this.isEnter) {
            this.isEnter = false
            this.options.OnHide && this.options.OnHide()
        }
    }
}

export { FieldObserver }