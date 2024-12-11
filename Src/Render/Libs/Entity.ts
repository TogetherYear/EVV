import { TEntity } from '@Render/Decorators/TEntity';
import { TRouter } from '@Render/Decorators/TRouter';
import { EventSystem } from '@Src/Libs/EventSystem';
import { Time } from '@Src/Utils/Time';

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
}

export { Entity };
