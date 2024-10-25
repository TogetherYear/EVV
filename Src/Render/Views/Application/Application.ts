import { onMounted, onUnmounted } from 'vue';
import { Component } from '@Render/Libs/Component';
import { TWindow } from '@Render/Decorators/TWindow';

@TWindow.State()
class Application extends Component {
    public constructor() {
        super();
    }

    public InitStates() {
        return {};
    }

    public Run() {
        onMounted(() => {});

        onUnmounted(() => {
            this.Destroy();
        });
    }

    protected Destroy() {}
}

export { Application };
