import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import SimpleParallax, { IParallaxSettings } from 'simple-parallax-js';

@Directive({
  selector: 'img[parallax],video[parallax]'
})
export class NgxSimpleParallaxJsDirective implements OnInit {

  @Input() parallaxConfig: IParallaxSettings;

  private _parallax: SimpleParallax;

  constructor(
    private _el: ElementRef<Element>
  ) {
  }

  public ngOnInit(): void {
    this._parallax = new SimpleParallax(this._el.nativeElement, this.parallaxConfig || null);
  }

}
