import { I } from '@Src/Instructions/I';
import { onMounted, onUnmounted } from 'vue';
import { Manager } from '@Render/Libs/Manager';
import { TEvent } from '@Render/Decorators/TEvent';

@TEvent.Create([
    I.IpcRendererEvent.SecondInstance,
    I.IpcRendererEvent.GlobalShortcut,
    I.IpcRendererEvent.FileDrop,
    I.IpcRendererEvent.ThemeUpdate,
    I.IpcRendererEvent.WidgetCreate,
    I.IpcRendererEvent.WidgetDestroy,
    I.IpcRendererEvent.WidgetEmpty
])
class App extends Manager {
    public InitStates() {
        return {};
    }

    public Run() {
        onMounted(() => {
            this.FileDropHandle();
            Renderer.Widget.Listen(this.OnMessage.bind(this));
        });

        onUnmounted(() => {
            this.Destroy();
        });
    }

    protected Destroy() {}

    private OnMessage(e: I.IpcRendererSendMessage) {
        this.Emit(e.type, e);
    }

    private FileDropHandle() {
        document.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.Emit(I.IpcRendererEvent.FileDrop, {
                type: I.IpcRendererEvent.FileDrop,
                send: {
                    files: e.dataTransfer?.files
                }
            });
        });
        document.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    }
}

const AppInstance = new App();

export { AppInstance as App };
