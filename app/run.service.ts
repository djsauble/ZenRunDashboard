import {Injectable} from '@angular/core';

import {Run} from './run';
import {RUNS} from './mock-runs';

@Injectable()
export class RunService {
  getRuns() {
    return RUNS;
  }
}
