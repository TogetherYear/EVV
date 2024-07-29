import { I } from '@Src/Instructions/I';
import { IR } from './Instructions/IR';
import { AActor } from './Libs/AActor';
import { onMounted, onUnmounted } from 'vue';

class App extends AActor {
    public InitStates() {
        return {};
    }

    public InitHooks() {}

    public Run() {
        onMounted(() => {
            this.CreateEvents();
            this.FileDropHandle();
            Renderer.Widget.Listen(this.OnMessage.bind(this));
        });

        onUnmounted(() => {
            this.Destroy();
        });
    }

    protected Destroy() {}

    private CreateEvents() {
        this.AddKey(I.IpcRendererEvent.SecondInstance);
        this.AddKey(I.IpcRendererEvent.GlobalShortcut);
        this.AddKey(I.IpcRendererEvent.FileDrop);
        this.AddKey(I.IpcRendererEvent.ThemeUpdate);
        this.AddKey(I.IpcRendererEvent.WidgetCreate);
        this.AddKey(I.IpcRendererEvent.WidgetDestroy);
        this.AddKey(I.IpcRendererEvent.WidgetEmpty);
    }

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

    public override AddListen(key: I.IpcRendererEvent, scope: Object, callback: IR.AppMessageCallback, once?: boolean): void {
        super.AddListen(key, scope, callback, once);
    }

    public override RemoveListen(key: I.IpcRendererEvent, scope: Object, callback: IR.AppMessageCallback): void {
        super.RemoveListen(key, scope, callback);
    }

    public Emit(key: string, data: I.IpcRendererSendMessage): void {
        super.Emit(key, data);
    }
}

const AppInstance = new App();

export { AppInstance as App };
