import {Injectable} from '@angular/core';
import {Environment} from './decorators/environment.decorator';
import {FunctionLogger} from './decorators/function-logger.decorator';

@Injectable()
export class AppService {

  @Environment('title')
  title;

  constructor() {
  }

  @FunctionLogger
  getRandomString(name: string): string {
    return 'Random String';
  }
}
