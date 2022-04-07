import {Component, OnInit} from '@angular/core';

import {LazyDialogService} from '../../../../../ngx-lazy-dialog/src/lib/services/lazy-dialog.service';
import {PaymentComponent} from '../../dialogs/payment/payment.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  constructor(
    private _service: LazyDialogService
  ) {
  }

  ngOnInit(): void {
  }

  async openDialog(): Promise<void> {
    const params = {
      foo: 'bar'
    };

    const module = await import('../../dialogs/payment/payment.module').then(m => m.PaymentModule);
    const dialog = await this._service.create<PaymentComponent>(module, params);

    dialog.onClose().then(result => {
      console.log(result);
    });
  }
}
