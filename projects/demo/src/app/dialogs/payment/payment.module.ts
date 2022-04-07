import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ModuleWithLazyDialog} from '../../../../../ngx-lazy-dialog/src/lib/models/module-with-lazy-dialog.model';

import {PaymentComponent} from './payment.component';


@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule
  ],
})
export class PaymentModule extends ModuleWithLazyDialog<PaymentComponent> {
  getDialog() {
    return PaymentComponent;
  };
}
