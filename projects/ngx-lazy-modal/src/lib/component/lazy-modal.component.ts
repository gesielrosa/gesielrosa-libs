import {
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentRef,
  NgModule,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { LazyModal } from '../models/lazy-modal.model';

@Component({
  selector: 'lazy-modal',
  template: `
    <div class="modal-container">
      <div aria-label="Close" class="modal-close" (close)="close()">&times;</div>
      <ng-template #modalContainer></ng-template>
    </div>
  `,
  styleUrls: ['./lazy-modal.component.scss']
})
export class LazyModalComponent {

  @ViewChild('modalContainer', {read: ViewContainerRef}) private modalContainer: ViewContainerRef;

  private modalRef: LazyModal;

  constructor(
    private _cdr: ChangeDetectorRef
  ) {
  }

  public create<T extends LazyModal>(factory: ComponentFactory<T>): ComponentRef<T> {
    this.modalContainer.clear();
    const component = this.modalContainer.createComponent(factory, 0);
    this.modalRef = component.instance;
    return component;
  }

  public close(): void {
    this.modalRef?.close();
  }

}

@NgModule({
  declarations: [
    LazyModalComponent
  ],
  exports: [
    LazyModalComponent
  ]
})
export class ModalModule {
}
