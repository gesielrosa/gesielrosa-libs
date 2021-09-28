import {
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { Modal } from '../../models/modal.model';

@Component({
  selector: 'modal',
  template: `
    <div class="modal-container">
      <div aria-label="Close" class="modal-close">&times;</div>
      <ng-template #modalContainer></ng-template>
    </div>
  `,
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @ViewChild('modalContainer', {read: ViewContainerRef}) private modalContainer: ViewContainerRef;

  private modalRef: Modal;

  constructor(
    private _cdr: ChangeDetectorRef
  ) {
  }

  public create<T extends Modal>(factory: ComponentFactory<T>): ComponentRef<T> {
    this.modalContainer.clear();
    const component = this.modalContainer.createComponent(factory, 0);
    this.modalRef = component.instance;
    return component;
  }

  public close(): void {
    this.modalRef?.close();
  }

}
