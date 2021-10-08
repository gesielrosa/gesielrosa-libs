import { Component, OnInit } from '@angular/core';

import { LazyDialog } from '../../../../../ngx-lazy-dialog/src/lib/models/lazy-dialog.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent extends LazyDialog implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  onParams(params: any): void {
    // receive dialog params
    console.log(params);
  }

}
