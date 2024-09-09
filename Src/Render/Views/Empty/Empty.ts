import { Component } from '@Render/Libs/Component';
import { onMounted, onUnmounted } from 'vue';

class Empty extends Component {
    public constructor() {
        super();
    }

    public InitStates() {
        return {};
    }

    public Run() {
        onMounted(() => {
            Renderer.Widget.PostMessage({
                reason: 'Empty'
            });
        });

        onUnmounted(() => {
            this.Destroy();
        });
    }

    protected Destroy() {}
}

export { Empty };
