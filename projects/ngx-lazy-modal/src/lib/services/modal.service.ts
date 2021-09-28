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

import { ModalComponent } from '../components/modal/modal.component';
import { Modal } from '../models/modal.model';
import { ModalRef } from '../models/modal-ref.model';

@Injectable()
export class ModalService {

  private _renderer: Renderer2;

  private _containerFactory: ComponentFactory<ModalComponent>;

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

  async create<T extends Modal>(compPath: Promise<any>, params?: any): Promise<ModalRef> {
    const container = this._setupContainerDiv();

    const containerRef = this._appRef.bootstrap(this._containerFactory, container);

    const {factory, moduleRef} = await this._loadModule(() => compPath);

    const componentRef = containerRef.instance.create(factory);

    if (params) {
      componentRef.instance.onParams(params);
    }

    return new ModalRef(containerRef, componentRef, moduleRef);
  }

  private _setupContainerDiv(): HTMLElement {
    const modalContainer = this._renderer.createElement('div');
    this._renderer.addClass(modalContainer, 'modal-root');
    this._renderer.appendChild(this._document.body, modalContainer);
    return modalContainer;
  }

  private _setupContainerFactory(): void {
    this._containerFactory = this._componentFactoryResolver.resolveComponentFactory(ModalComponent);
  }

  private _loadModule<T extends Modal>(path: any): Promise<{ factory: ComponentFactory<T>, moduleRef: NgModuleRef<T> }> {
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
            console.error('Modal: Check if the modal module contains bootstrap component');
            reject(err);
          }
        });
    });
  }

}
