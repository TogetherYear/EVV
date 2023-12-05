import { ref, onMounted, onUnmounted } from 'vue'
import minIcon from '@render/assets/mc/min.png'
import maxIcon from '@render/assets/mc/max.png'
import hideIcon from '@render/assets/mc/hide.png'
import { AActor } from '@render/libs/AActor'
import { DR } from '@render/decorators/DR'

class HeaderBar extends AActor {
    public constructor() {
        super()
    }

    private options = ref<Array<DR.IHeaderBarOptionItem>>([
        { type: 'Min', icon: minIcon, label: '最小化' },
        { type: 'Max', icon: maxIcon, label: '最大化' },
        { type: 'Hide', icon: hideIcon, label: '隐藏' }
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
