import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AlertComponent} from './alert.component';

import {ModuleWithLazyDialog} from '../../../../../ngx-lazy-dialog/src/lib/models/module-with-lazy-dialog.model';

@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule
  ],
})
export class AlertModule {
  static getDialog(): ModuleWithLazyDialog<AlertComponent> {
    return {component: AlertComponent};
  }
}
