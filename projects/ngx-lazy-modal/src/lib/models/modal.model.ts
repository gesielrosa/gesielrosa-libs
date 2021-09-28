import { ModalRef } from './modal-ref.model';

export abstract class Modal {

  public modalRef: ModalRef;

  public onParams(params: any): void {
  }

  public close(output?: any): void {
    this.modalRef.close(output);
  }

}
