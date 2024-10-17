import { onMounted, onUnmounted, ref } from 'vue';
import openIcon from '@Render/Assets/Images/open.png';
import { Component } from '@Render/Libs/Component';
import { Time } from '@Src/Utils/Time';
import { IR } from '@Render/Instructions/IR';

class Tray extends Component {
    public constructor() {
        super();
    }

    private menu = ref<Array<IR.MenuItem>>([
        {
            icon: openIcon,
            key: '开机自启',
            check: false,
            id: Time.GenerateRandomUid()
        },
        {
            icon: '',
            key: 'Separator',
            check: false,
            id: Time.GenerateRandomUid()
        },
        {
            icon: '',
            key: '退出',
            check: false,
            id: Time.GenerateRandomUid()
        }
    ]);

    public InitStates() {
        return {
            menu: this.menu
        };
    }

    public InitHooks() {}

    public Run() {
        onMounted(async () => {
            this.SetAutostart();
        });

        onUnmounted(() => {
            this.Destroy();
        });
    }

    protected Destroy() {}

    private async SetAutostart() {
        const at = this.menu.value.find((m) => m.key === '开机自启');
        if (at) {
            at.check = await Renderer.App.IsAutostart();
        }
    }

    public async OnMenuClick(m: IR.MenuItem) {
        if (m.key === '开机自启') {
            const at = await Renderer.App.IsAutostart();
            await Renderer.App.SetAutostart(!at);
            await this.SetAutostart();
        } else if (m.key === '退出') {
            await Renderer.App.Close();
        }
    }
}

export { Tray };
