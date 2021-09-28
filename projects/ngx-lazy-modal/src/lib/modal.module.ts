import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './services/modal.service';

@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent
  ]
})
export class ModalModule {
  static forRoot() {
    return {
      ngModule: ModalModule,
      providers: [
        ModalService
      ]
    };
  }
}
