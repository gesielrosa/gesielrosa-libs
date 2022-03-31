import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import SimpleParallax, { IParallaxSettings } from 'simple-parallax-js';

import { IParallaxConfig } from './ngx-simple-parallax-js.interface';

@Directive({
  selector: 'img[parallax],video[parallax]'
})
export class NgxSimpleParallaxJsDirective implements OnInit, OnDestroy {

  @Input() set parallaxConfig(config: IParallaxConfig) {
    this._parallaxConfig = config || {};
    this._parallax?.refresh();
  }

  private _parallaxConfig: IParallaxConfig;

  private _parallax: SimpleParallax;

  constructor(
    private _el: ElementRef<Element>
  ) {
  }

  public ngOnInit(): void {
    this._parallax = new SimpleParallax(this._el.nativeElement, this._parallaxConfig as IParallaxSettings || null);
  }

  public ngOnDestroy(): void {
    this._parallax?.destroy();
  }

}
