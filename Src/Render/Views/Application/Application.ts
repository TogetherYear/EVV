import { I } from '@Src/Instructions/I';
import { App } from '@Render/App/App';
import { onMounted, onUnmounted } from 'vue';
import { Component } from '@Render/Libs/Component';
import { TEvent } from '@Render/Decorators/TEvent';

class Application extends Component {
    public constructor() {
        super();
    }

    public InitStates() {
        return {};
    }

    public InitHooks() {}

    public Run() {
        onMounted(() => {
            this.State();
        });
        onUnmounted(() => {
            this.Destroy();
        });
    }

    protected Destroy() {}

    @TEvent.Listen(App, I.IpcRendererEvent.SecondInstance)
    private async OnSecondInstance(e: I.IpcRendererSendMessage) {
        await Renderer.Widget.Show();
    }

    private async State() {
        if (location.href.indexOf('Application') != -1) {
            await Renderer.Widget.SetSize({
                width: parseInt(localStorage.getItem('Application_Width') || '1000'),
                height: parseInt(localStorage.getItem('Application_Height') || '560')
            });
            await Renderer.Widget.Center();
            await Renderer.Widget.Show();
            window.addEventListener('resize', (e: UIEvent) => {
                localStorage.setItem('Application_Width', `${window.innerWidth}`);
                localStorage.setItem('Application_Height', `${window.innerHeight}`);
            });
        }
    }
}

export { Application };
