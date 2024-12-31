import { TManager } from '@Main/Decorators/TManager';
import { Entity } from './Entity';
import { TTool } from '@Main/Decorators/TTool';

@TTool.Generate()
@TManager.Generate()
class Manager extends Entity {}

export { Manager };
