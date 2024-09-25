import { ref, onMounted, onUnmounted } from 'vue';
import minIcon from '@Render/Assets/Images/min.png';
import maxIcon from '@Render/Assets/Images/max.png';
import hideIcon from '@Render/Assets/Images/hide.png';
import { IR } from '@Render/Instructions/IR';
import { Component } from '@Render/Libs/Component';

class HeaderBar extends Component {
    public constructor() {
        super();
    }

    private options = ref<Array<IR.IHeaderBarOptionItem>>([
        { type: 'Min', icon: minIcon, label: '最小化' },
        { type: 'Max', icon: maxIcon, label: '最大化' },
        { type: 'Hide', icon: hideIcon, label: '隐藏' }
    ]);

    public async OptionClick(type: string) {
        if ((type = 'Min')) {
            await Renderer.Widget.Min();
        } else if (type === 'Max') {
            await Renderer.Widget.Max();
        } else if (type === 'Hide') {
            await Renderer.Widget.Hide();
        }
    }

    public InitStates() {
        return {
            options: this.options
        };
    }

    public Run() {
        onMounted(() => {});

        onUnmounted(() => {
            this.Destroy();
        });
    }

    protected Destroy() {}
}

export { HeaderBar };
