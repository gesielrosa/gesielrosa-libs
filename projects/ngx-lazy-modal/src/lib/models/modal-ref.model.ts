import { ComponentRef, NgModuleRef } from '@angular/core';
import { Subject } from 'rxjs';

import { Modal } from './modal.model';
import { ModalComponent } from '../components/modal/modal.component';

export class ModalRef {

  private _close$ = new Subject<any>();

  constructor(
    private _modalContainer: ComponentRef<ModalComponent>,
    private _modal: ComponentRef<Modal>,
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
