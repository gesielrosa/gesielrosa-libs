import { ComponentRef, NgModuleRef } from '@angular/core';
import { Subject } from 'rxjs';

import { LazyDialogComponent } from '../component/lazy-dialog.component';
import { LazyDialog } from './lazy-dialog.model';

export class LazyDialogRef {

  private _close$ = new Subject<any>();

  constructor(
    private _dialogContainer: ComponentRef<LazyDialogComponent>,
    private _dialog: ComponentRef<LazyDialog>,
    private _moduleRef: NgModuleRef<any>
  ) {
    this._dialog.instance.dialogRef = this;
  }

  public close(output?: any): void {
    this._close$.next(output);
    this.destroy$();
  }

  public onClose(): Promise<any> {
    return this._close$.toPromise();
  }

  private destroy$(): void {
    this._dialog.destroy();
    this._dialogContainer.destroy();
    this._moduleRef.destroy();
    this._close$.complete();
  }

}
