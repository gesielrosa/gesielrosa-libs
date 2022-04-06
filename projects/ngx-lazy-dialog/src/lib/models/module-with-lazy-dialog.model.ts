import {Type} from '@angular/core';

import {LazyDialog} from './lazy-dialog.model';

export declare interface ModuleWithLazyDialog<T extends LazyDialog> {
  component: Type<T>;
}
