import { ComponentRef, NgModuleRef } from '@angular/core';
import { Subject } from 'rxjs';

import { LazyModalComponent } from '../component/lazy-modal.component';
import { LazyModal } from './lazy-modal.model';

export class LazyModalRef {

  private _close$ = new Subject<any>();

  constructor(
    private _modalContainer: ComponentRef<LazyModalComponent>,
    private _modal: ComponentRef<LazyModal>,
    private _moduleRef: NgModuleRef<any>
  ) {
    this._modal.instance.modalRef = this;
  }

  public close(output?: any): void {
    this._close$.next(output);
    this.destroy$();
  }

  public onClose(): Promise<any> {
    return this._close$.toPromise();
  }

  private destroy$(): void {
    this._modal.destroy();
    this._modalContainer.destroy();
    this._moduleRef.destroy();
    this._close$.complete();
  }

}
