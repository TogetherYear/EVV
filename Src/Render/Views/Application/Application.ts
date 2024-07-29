import { I } from '@Src/Instructions/I';
import { App } from '@Render/App';
import { AActor } from '@Render/Libs/AActor';
import { Preload } from '@Render/Preload/Preload';
import { onMounted, onUnmounted } from 'vue';

class Application extends AActor {
    public constructor() {
        super();
    }

    public InitStates() {
        return {};
    }

    public InitHooks() {}

    public Run() {
        onMounted(() => {
            this.ListenEvents();
            this.State();
        });
        onUnmounted(() => {
            this.Destroy();
        });
    }

    protected Destroy() {}

    private ListenEvents() {
        App.AddListen(I.IpcRendererEvent.SecondInstance, this, this.OnSecondInstance);
    }

    private async OnSecondInstance(e: I.IpcRendererSendMessage) {
        Preload.message.error('已关闭第二个实例');
        await Renderer.Widget.Show();
    }

    private async State() {
        if (location.href.indexOf('Application') != -1) {
            await Renderer.Widget.SetSize({
                width: parseInt(localStorage.getItem('width') || '1000'),
                height: parseInt(localStorage.getItem('height') || '560')
            });
            await Renderer.Widget.Center();
            await Renderer.Widget.Show();
            window.addEventListener('resize', (e: UIEvent) => {
                localStorage.setItem('width', `${window.innerWidth}`);
                localStorage.setItem('height', `${window.innerHeight}`);
            });
        }
    }
}

export { Application };
