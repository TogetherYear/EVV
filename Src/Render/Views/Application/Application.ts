import { I } from '@Src/Instructions/I';
import { App } from '@Render/App/App';
import { onMounted, onUnmounted } from 'vue';
import { Component } from '@Render/Libs/Component';
import { TEvent } from '@Render/Decorators/TEvent';
import { TWindow } from '@Render/Decorators/TWindow';

@TWindow.State()
class Application extends Component {
    public constructor() {
        super();
    }

    public InitStates() {
        return {};
    }

    public InitHooks() {}

    public Run() {
        onMounted(async () => {
            await this.SetDefault();
        });
        onUnmounted(() => {
            this.Destroy();
        });
    }

    protected Destroy() {}

    private async SetDefault() {
        await Renderer.Widget.Center();
        await Renderer.Widget.Show();
    }

    @TEvent.Listen(App, I.IpcRendererEvent.SecondInstance)
    private async OnSecondInstance() {
        await Renderer.Widget.Show();
    }
}

export { Application };
