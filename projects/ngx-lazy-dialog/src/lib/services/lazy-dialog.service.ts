import {
  ApplicationRef,
  Compiler,
  ComponentFactory,
  ComponentFactoryResolver,
  Inject,
  Injectable,
  Injector,
  NgModuleFactory,
  NgModuleRef,
  Renderer2,
  RendererFactory2,
  Type
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { LazyDialogComponent } from '../component/lazy-dialog.component';
import { LazyDialog } from '../models/lazy-dialog.model';
import { LazyDialogRef } from '../models/lazy-dialog-ref.model';

@Injectable({
  providedIn: 'root',
})
export class LazyDialogService {

  private _renderer: Renderer2;

  private _containerFactory: ComponentFactory<LazyDialogComponent>;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    private _compiler: Compiler,
    private _rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private _document: Document,
    private _injector: Injector
  ) {
    this._renderer = this._rendererFactory.createRenderer(null, null);
    this._setupContainerFactory();
  }

  async create<T extends LazyDialog>(compPath: Promise<any>, params?: any): Promise<LazyDialogRef> {

    // fix "ApplicationRef.tick() is called recursively" error
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 50));

    const container = this._setupContainerDiv();

    const containerRef = this._appRef.bootstrap(this._containerFactory, container);

    const {factory, moduleRef} = await this._loadModule(() => compPath);

    const componentRef = containerRef.instance.create(factory);

    if (params) {
      componentRef.instance.onParams(params);
    }

    return new LazyDialogRef(containerRef, componentRef, moduleRef);
  }

  private _setupContainerDiv(): HTMLElement {
    const dialogContainer = this._renderer.createElement('div');
    this._renderer.addClass(dialogContainer, 'dialog-root');
    this._renderer.appendChild(this._document.body, dialogContainer);
    return dialogContainer;
  }

  private _setupContainerFactory(): void {
    this._containerFactory = this._componentFactoryResolver.resolveComponentFactory(LazyDialogComponent);
  }

  private _loadModule<T extends LazyDialog>(path: any): Promise<{ factory: ComponentFactory<T>, moduleRef: NgModuleRef<T> }> {
    return new Promise((resolve, reject) => {
      (path() as Promise<Type<any>>)
        // @ts-ignore
        .then((elementModuleOrFactory: Type<any>) => {
          try {
            return this._compiler.compileModuleAsync(elementModuleOrFactory);
          } catch (err) {
            reject(err);
          }
        })
        .then((moduleFactory: NgModuleFactory<T>) => {
          try {
            const moduleRef = moduleFactory.create(this._injector);
            const factory: ComponentFactory<T> = moduleRef.componentFactoryResolver.resolveComponentFactory(
              // @ts-ignore
              moduleRef._bootstrapComponents[0]
            );
            resolve({factory, moduleRef});
          } catch (err) {
            console.error('Lazy Dialog: Check if the dialog module contains a bootstrap component');
            reject(err);
          }
        });
    });
  }

}
