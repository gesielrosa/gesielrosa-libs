[![npm version](https://badge.fury.io/js/ngx-lazy-dialog.svg)](https://www.npmjs.com/package/ngx-lazy-dialog)

# Ngx Lazy Dialog

This library allows you to create dialogs with lazy loading.
The dialog content is fully customizable, depending on the component you load into it.

<hr>

### Installation

The ngx-lazy-dialog can be installed with npm:

`npm install ngx-lazy-dialog  --save`

<hr>

### Creating lazy loading dialogs

[Read the article](https://medium.com/@gesielr/ngx-lazy-dialog-lazy-loading-dialogs-in-angular-498edf937e3e)

<hr>

### Customizing the container and backdrop

You can customize the dialog container and backdrop using CSS variables.
See the list of variables and their default values below:

| Var | Default | Description |
| ----------- | ----------- | ----------- |
| --dialog-backdrop-bg | rgba(0, 0, 0, 0.25) | Backdrop color |
| --dialog-bg | #FFFFFF | Container background color |
| --dialog-padding | 24px | Container padding |
| --dialog-border-radius | 8px | Container border radius |
| --dialog-shadow | rgba(9, 30, 66, 0.25) 0 4px 8px -2px, <br>  rgba(9, 30, 66, 0.08) 0 0 0 1px) | Container box shadow |
| --dialog-max-width | 90vw | Max container width |
| --dialog-max-height | 90vh | Max container height |
| --dialog-min-width | 200px | Min container width |
| --dialog-min-height | 100px | Min container height |
| --dialog-z-index | 1001 | Z-index |
| --dialog-close-color | #000000 | Close icon color |
| --dialog-close-size | 24px | Close icon size |
| --dialog-close-position | 24px | Close icon position |


Example:

Global customization:

``` css
:root {
  --dialog-bg: #E7EAEF;
  --dialog-close-color: #123661;
}
```

Or

Specific customization:

``` css
.custom-dialog {
  --dialog-bg: #E7EAEF;
  --dialog-close-color: #123661;
}
```

and add the custom class to the dialog creator:

```
this.service.create(component, params, 'custom-dialog')
```


<hr>

### Created by [`@gesielrosa`](https://github.com/gesielrosa)
