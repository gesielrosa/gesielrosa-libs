import {
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentRef,
  ElementRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {fromEvent} from 'rxjs';
import {filter} from 'rxjs/operators';

import {LazyDialog} from '../models/lazy-dialog.model';

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

  private dialogComponentRef: LazyDialog;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _el: ElementRef<HTMLElement>
  ) {
  }

  public create<T extends LazyDialog>(factory: ComponentFactory<T>): ComponentRef<T> {
    this.dialogContainer.clear();
    const component = this.dialogContainer.createComponent(factory, 0);
    this.dialogComponentRef = component.instance;
    this.dialogComponentRef.close = this.close.bind(this);
    return component;
  }

  public close(output?: any): void {
    const subs = fromEvent<AnimationEvent>(this._el.nativeElement, 'animationend')
      .pipe(
        filter(event => event.animationName === 'fadeOut')
      )
      .subscribe(() => {
        this.dialogComponentRef.dialogRef?.close(output);
        subs.unsubscribe();
      })

    this._el.nativeElement.style.animation = 'fadeOut 160ms';
  }

}
