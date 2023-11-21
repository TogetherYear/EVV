import { ref, onMounted, onUnmounted } from 'vue'
import minIcon from '@render/assets/mc/min.png'
import maxIcon from '@render/assets/mc/max.png'
import closeIcon from '@render/assets/mc/close.png'
import { AActor } from '@render/libs/AActor'

interface IOptionItem {
    type: string,
    icon: string,
    label: string
}

class HeaderBar extends AActor {
    public constructor() {
        super()
    }

    private options = ref<Array<IOptionItem>>([
        { type: 'Min', icon: minIcon, label: '最小化' },
        { type: 'Max', icon: maxIcon, label: '最大化' },
        { type: 'Hide', icon: closeIcon, label: '隐藏' }
    ])

    public OptionClick(type: string) {
        if (type == 'Min') {
            Renderer.Widget.Min()
        }
        else if (type == 'Max') {
            Renderer.Widget.Max()
        }
        else if (type == 'Hide') {
            Renderer.Widget.Hide()
        }
    }

    public InitStates() {
        return {
            options: this.options,
        }
    }

    public InitHooks() {

    }

    public Run() {
        onMounted(() => {

        })

        onUnmounted(() => {
            this.Destroy()
        })
    }

    protected Destroy() {

    }
}

export { HeaderBar }
