import { onMounted, onUnmounted, ref } from 'vue';
import openIcon from '@Render/Assets/Images/open.png';
import { Component } from '@Render/Libs/Component';
import { Time } from '@Src/Utils/Time';
import { IR } from '@Render/Instructions/IR';
import { TEvent } from '@Main/Decorators/TEvent';
import { App } from '@Render/App/App';
import { I } from '@Src/Instructions/I';

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
            this.SetDefault();
            this.SetAutostart();
        });

        onUnmounted(() => {
            this.Destroy();
        });
    }

    protected Destroy() {}

    private async SetDefault() {
        const spe = this.menu.value.filter((m) => m.key === 'Separator').length;
        const height = (spe + 1) * 8 + (this.menu.value.length - spe) * 24;
        await Renderer.Widget.SetSize({ width: 126, height });
    }

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

    @TEvent.Listen(App, I.IpcRendererEvent.SecondInstance)
    private async OnSecondInstance() {
        await Renderer.App.ShowMainWindow();
    }

    @TEvent.Listen(App, I.IpcRendererEvent.DeepLink)
    private async OnDeepLink(e: Record<string, unknown>) {
        console.log(e);
    }
}

export { Tray };
