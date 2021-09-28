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

import { LazyModalComponent } from '../component/lazy-modal.component';
import { LazyModal } from '../models/lazy-modal.model';
import { LazyModalRef } from '../models/lazy-modal-ref.model';

@Injectable({
  providedIn: 'root',
})
export class LazyModalService {

  private _renderer: Renderer2;

  private _containerFactory: ComponentFactory<LazyModalComponent>;

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

  async create<T extends LazyModal>(compPath: Promise<any>, params?: any): Promise<LazyModalRef> {

    // fix "ApplicationRef.tick() is called recursively" error
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 50));

    const container = this._setupContainerDiv();

    const containerRef = this._appRef.bootstrap(this._containerFactory, container);

    const {factory, moduleRef} = await this._loadModule(() => compPath);

    const componentRef = containerRef.instance.create(factory);

    if (params) {
      componentRef.instance.onParams(params);
    }

    return new LazyModalRef(containerRef, componentRef, moduleRef);
  }

  private _setupContainerDiv(): HTMLElement {
    const modalContainer = this._renderer.createElement('div');
    this._renderer.addClass(modalContainer, 'modal-root');
    this._renderer.appendChild(this._document.body, modalContainer);
    return modalContainer;
  }

  private _setupContainerFactory(): void {
    this._containerFactory = this._componentFactoryResolver.resolveComponentFactory(LazyModalComponent);
  }

  private _loadModule<T extends LazyModal>(path: any): Promise<{ factory: ComponentFactory<T>, moduleRef: NgModuleRef<T> }> {
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
            console.error('Lazy Modal: Check if the modal module contains a bootstrap component');
            reject(err);
          }
        });
    });
  }

}
