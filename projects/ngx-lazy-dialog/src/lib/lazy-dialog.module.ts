import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LazyDialogComponent} from './component/lazy-dialog.component';
import {LazyDialogService} from './services/lazy-dialog.service';

@NgModule({
  declarations: [
    LazyDialogComponent
  ],
  imports: [CommonModule],
  exports: [
    LazyDialogComponent
  ]
})
export class LazyDialogModule {
  static forRoot(): ModuleWithProviders<LazyDialogModule> {
    return {
      ngModule: LazyDialogModule,
      providers: [LazyDialogService]
    }
  }
}
