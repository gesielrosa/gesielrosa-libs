import { LazyModalRef } from './lazy-modal-ref.model';

export abstract class LazyModal {

  public modalRef: LazyModalRef;

  public onParams(params: any): void {
  }

  public close(output?: any): void {
    this.modalRef.close(output);
  }

}
