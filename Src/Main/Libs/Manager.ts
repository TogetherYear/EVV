import { TManager } from '@Main/Decorators/TManager';
import { Entity } from './Entity';
import { TEvent } from '@Main/Decorators/TEvent';
import { TTool } from '@Main/Decorators/TTool';

@TTool.Generate()
@TEvent.Generate()
@TManager.Generate()
class Manager extends Entity {}

export { Manager };
