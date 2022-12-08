import { ref } from 'vue'
import minIcon from '@render/assets/mc/min.png'
import maxIcon from '@render/assets/mc/max.png'
import closeIcon from '@render/assets/mc/close.png'

interface IOptionItem {
    type: string,
    icon: string,
    label: string
}

class HeaderBar {
    public constructor() { }

    private options = ref<Array<IOptionItem>>([
        { type: 'Min', icon: minIcon, label: '最小化' },
        { type: 'Max', icon: maxIcon, label: '最大化' },
        { type: 'Close', icon: closeIcon, label: '隐藏' }
    ])

    public OptionClick(view: string, type: string) {
        console.log(`${view}${type}`)
        General.ipcRenderer.send(`${view}${type}`)
    }

    public InitStates() {
        return {
            options: this.options,
        }
    }
}

export { HeaderBar }
