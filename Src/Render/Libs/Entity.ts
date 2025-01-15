import { TComponent } from '@Render/Decorators/TComponent';
import { TEntity } from '@Render/Decorators/TEntity';
import { TRouter } from '@Render/Decorators/TRouter';
import { EventSystem } from '@Src/Libs/EventSystem';
import { Time } from '@Src/Utils/Time';
import { Component } from './Component';

/**
 * 根 我用来代理一些变量的
 */
@TEntity.Generate()
class Entity extends EventSystem {
    /**
     * 唯一ID
     */
    public unique_Id = Time.GenerateRandomUid();

    /**
     * 当前页面路由
     */
    public get Route() {
        return TRouter.currentPath.value;
    }

    /**
     * 当前页面参数
     */
    public get Query() {
        return TRouter.currentQuery;
    }

    /**
     * 获取当前页面所有存活的 Component
     */
    public GetAllComponent() {
        return TComponent.components;
    }

    /**
     * 根据条件获取 Component
     */
    public GetComponent<T extends Component>(Condition: (instance: T) => boolean): T | null {
        for (let c of TComponent.components) {
            if (Condition(c as T)) {
                return c as T;
            }
        }
        return null;
    }
}

export { Entity };
