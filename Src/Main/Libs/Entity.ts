import { TEntity } from '@Main/Decorators/TEntity';
import { EventSystem } from '@Src/Libs/EventSystem';
import { Time } from '@Src/Utils/Time';

@TEntity.Generate()
class Entity extends EventSystem {
    /**
     * 唯一ID
     */
    public unique_Id = Time.GenerateRandomUid();
}

export { Entity };
