import { Component, OnInit } from '@angular/core';

import { LazyDialogService } from 'ngx-lazy-dialog';

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

    const component = import('./dialogs/alert/alert.module').then(m => m.AlertModule);
    const params = {
      foo: 'bar'
    };

    const dialog = await this._service.create(component, params);

    dialog.onClose().then(result => {
      console.log(result);
    });

  }

}
