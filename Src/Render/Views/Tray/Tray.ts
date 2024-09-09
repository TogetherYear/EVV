import { Component } from '@Render/Libs/Component';
import { onMounted, onUnmounted } from 'vue';

class Tray extends Component {
    public constructor() {
        super();
    }

    public InitStates() {
        return {};
    }

    public InitHooks() {}

    public Run() {
        onMounted(() => {});

        onUnmounted(() => {
            this.Destroy();
        });
    }

    protected Destroy() {}

    public OnClose() {
        Renderer.App.Close();
    }
}

export { Tray };
