import { IR } from '@Render/Instructions/IR';
import { Manager } from '../Libs/Manager';

class LocalStore extends Manager {
    public SetLocal(key: keyof IR.LocalStore.LocalStoreKey, value: string) {
        localStorage.setItem(`EVV_${key}`, value);
    }

    public GetLocal(key: keyof IR.LocalStore.LocalStoreKey) {
        return localStorage.getItem(`EVV_${key}`) || '';
    }
}

const LocalStoreInstance = new LocalStore();

export { LocalStoreInstance as LocalStore };
