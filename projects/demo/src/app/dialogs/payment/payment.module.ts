import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PaymentComponent} from './payment.component';

import {ModuleWithLazyDialog} from '../../../../../ngx-lazy-dialog/src/lib/models/module-with-lazy-dialog.model';

@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule
  ],
})
export class PaymentModule {
  static getDialog(): ModuleWithLazyDialog<PaymentComponent> {
    return {component: PaymentComponent};
  }
}
