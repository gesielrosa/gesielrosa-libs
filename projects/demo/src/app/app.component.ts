import {Component, OnInit} from '@angular/core';

import {LazyDialogService} from '../../../ngx-lazy-dialog/src/lib/services/lazy-dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private _service: LazyDialogService
  ) {
  }

  ngOnInit(): void {
    this.openAlertDialog();
  }

  async openAlertDialog(): Promise<void> {
    const params = {
      foo: 'bar'
    };

    const module = await import('./dialogs/payment/payment.module');
    const dialog = await this._service.create(module.PaymentModule.getComponent().component, params);

    dialog.onClose().then(result => {
      console.log(result);
    });

  }
}
