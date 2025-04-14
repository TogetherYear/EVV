import { TManager } from '@Main/Decorators/TManager';
import { Entity } from './Entity';
import { TTool } from '@Main/Decorators/TTool';
import { IM } from '@Main/Instructions/IM';

@TTool.Generate()
@TManager.Generate()
class Manager extends Entity {
    constructor(ctx: IM.IContext) {
        super();
        this.ctx = ctx;
    }

    public ctx!: IM.IContext;
}

export { Manager };
