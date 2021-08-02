import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import SimpleParallax, { IParallaxSettings } from 'simple-parallax-js';

import { IParallaxConfig } from './ngx-simple-parallax-js.interface';

@Directive({
  selector: 'img[parallax],video[parallax]'
})
export class NgxSimpleParallaxJsDirective implements OnInit, OnDestroy {

  @Input() parallaxConfig: IParallaxConfig;

  private _parallax: SimpleParallax;

  constructor(
    private _el: ElementRef<Element>
  ) {
  }

  public ngOnInit(): void {
    this._parallax = new SimpleParallax(this._el.nativeElement, this.parallaxConfig as IParallaxSettings || null);
  }

  public ngOnDestroy(): void {
    this._parallax?.destroy();
  }

}
