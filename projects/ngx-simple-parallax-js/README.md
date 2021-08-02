![https://github.com/gesielrosa/gesielrosa-libs/blob/main/projects/ngx-simple-parallax-js/logo.png](logo.png)

[![npm version](https://badge.fury.io/js/ngx-simple-parallax-js.svg)](https://www.npmjs.com/package/ngx-simple-parallax-js)

# NgxSimpleParallaxJs

This library allows you to use simpleParallax.js in Angular easily.

## [simpleParallax.js](https://github.com/geosigno/simpleParallax.js)

## Installation

<hr>

### Install dependencies

The ngx-simple-parallax-js can be installed with npm:

`npm install ngx-simple-parallax-js  --save`

Also install simpleParallax.js too:

`npm install simple-parallax-js  --save`

<hr>

### Import `NgxSimpleParallaxJsModule`

Then, import NgxSimpleParallaxJsModule into a module of your Angular app.

```
import { NgxSimpleParallaxJsModule } from 'ngx-simple-parallax-js';

@NgModule({
  declarations: [],
  imports: [
    NgxSimpleParallaxJsModule
  ]
  exports: []
})
export class YourModule {
}
```

### Using directive

In images:

```
 <img parallax class="thumbnail" src="image.jpg" alt="image">
```

In videos:

```
<video parallax>
  <source src="video.mp4" type="video/mp4">
</video>
```

With settings:

```
 <img parallax [parallaxConfig]="parallaxConfig" class="thumbnail" src="image.jpg" alt="image">
```

## Complete documentation for `simpleParallax.js`:

### [simpleParallax.js DOCS](https://github.com/geosigno/simpleParallax.js#readme)

<br><hr>

### [`@gesielrosa`](https://github.com/gesielrosa)
