import { I } from '@Src/Instructions/I';
import { App } from '@Render/App/App';
import { onMounted, onUnmounted } from 'vue';
import { Component } from '@Render/Libs/Component';
import { TEvent } from '@Render/Decorators/TEvent';
import { TTool } from '@Render/Decorators/TTool';

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
        await Renderer.Widget.SetSize({
            width: parseInt(localStorage.getItem(`Application:${this.Route}:Width`) || '1000'),
            height: parseInt(localStorage.getItem(`Application:${this.Route}:Height`) || '560')
        });
        await Renderer.Widget.Center();
        await Renderer.Widget.Show();
    }

    @TTool.Debounce(300)
    @TEvent.Listen(window, 'resize')
    private OnResized(e: UIEvent) {
        localStorage.setItem(`Application:${this.Route}:Width`, `${window.innerWidth}`);
        localStorage.setItem(`Application:${this.Route}:Height`, `${window.innerHeight}`);
    }

    @TEvent.Listen(App, I.IpcRendererEvent.SecondInstance)
    private async OnSecondInstance() {
        await Renderer.Widget.Show();
    }
}

export { Application };
