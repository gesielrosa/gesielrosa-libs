import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentComponent } from './payment.component';

@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule
  ],
  bootstrap: [
    PaymentComponent
  ]
})
export class PaymentModule {
}
