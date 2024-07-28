import { D } from '@Decorators/D';
import { onMounted, onUnmounted } from 'vue';

namespace DR {
    export function ClassDec() {
        return function <T extends new (...args: Array<any>) => Object>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.Hooks();
                }

                private Hooks() {
                    onMounted(() => {});

                    onUnmounted(() => {});
                }
            };
        };
    }

    export function FunctionDec() {
        return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
            const original = descriptor.value.bind(target);
            descriptor.value = (...args: Array<unknown>) => {
                original(...args);
            };
        };
    }

    export type AppMessageCallback = (e: D.IpcRendererSendMessage) => void;

    export interface IHeaderBarOptionItem {
        type: string;
        icon: string;
        label: string;
    }
}
export { DR };
