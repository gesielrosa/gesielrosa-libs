import { Component, OnInit } from '@angular/core';

import { LazyDialog } from '../../../../../ngx-lazy-dialog/src/lib/models/lazy-dialog.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent extends LazyDialog implements OnInit {

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
