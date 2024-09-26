import { TComponent } from '@Render/Decorators/TComponent';
import { TEvent } from '@Render/Decorators/TEvent';
import { TRouter } from '@Render/Decorators/TRouter';
import { TTest } from '@Render/Decorators/TTest';
import { TTool } from '@Render/Decorators/TTool';
import { Entity } from './Entity';
import { TWindow } from '@Render/Decorators/TWindow';

/**
 * 页面组件
 */
@TWindow.Generate()
@TTest.Generate()
@TTool.Generate()
@TRouter.Generate()
@TEvent.Generate(TEvent.Lifecycle.Temporary)
@TComponent.Generate()
class Component<T extends Component<T> | null = null> extends Entity {
    public constructor(parent: T | null = null) {
        super();
        this.parent = parent;
    }

    public parent: T | null = null;

    public get P() {
        return this.parent!;
    }
}

export { Component };
