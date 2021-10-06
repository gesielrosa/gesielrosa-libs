import {
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentRef,
  NgModule,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { LazyDialog } from '../models/lazy-dialog.model';

@Component({
  selector: 'lazy-dialog',
  template: `
    <div class="dialog-container">
      <div aria-label="Close" class="dialog-close" (click)="close()">&times;</div>
      <ng-template #dialogContainer></ng-template>
    </div>
  `,
  styleUrls: ['./lazy-dialog.component.scss']
})
export class LazyDialogComponent {

  @ViewChild('dialogContainer', {read: ViewContainerRef}) private dialogContainer: ViewContainerRef;

  private dialogRef: LazyDialog;

  constructor(
    private _cdr: ChangeDetectorRef
  ) {
  }

  public create<T extends LazyDialog>(factory: ComponentFactory<T>): ComponentRef<T> {
    this.dialogContainer.clear();
    const component = this.dialogContainer.createComponent(factory, 0);
    this.dialogRef = component.instance;
    return component;
  }

  public close(): void {
    this.dialogRef?.close();
  }

}

@NgModule({
  declarations: [
    LazyDialogComponent
  ],
  exports: [
    LazyDialogComponent
  ]
})
export class LazyDialogModule {
}
