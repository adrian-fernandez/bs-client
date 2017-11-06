# ember-cli-font-awesome [![Build Status](https://travis-ci.org/lfridael/ember-cli-font-awesome.svg?branch=master)](https://travis-ci.org/lfridael/ember-cli-font-awesome)

An [ember-cli](http://www.ember-cli.com) addon for using [Font Awesome](http://fortawesome.github.io/Font-Awesome/) icons in Ember applications.

## Install

```bash
# In your application's directory:
$ ember install ember-cli-font-awesome
$ ember generate ember-cli-font-awesome
```

### Compatibility

From v0.1.0 onwards this addon requires Ember v1.13 and Ember CLI v1.13.1.

If you're using older versions of either Ember or Ember CLI, use v0.0.9 instead:

```bash
npm install --save-dev ember-cli-font-awesome@0.0.9
```

### Use sass/scss

You can opt-in to the scss version of font-awesome. You can do this by adding
the following configuration in `ember-cli-build.js`:

```js
var app = new EmberApp({
  emberCliFontAwesome: {
    useScss: true
  }
});

```

Then in your `app.scss`:

```scss
@import "bower_components/font-awesome/scss/font-awesome";
```

## Basic usage

In your Handlebars templates:

```hbs
{{fa-icon "camera"}}
```

If you prefer, you can use the `fa-` prefix in the icon name.

```hbs
{{!-- Equivalent --}}
{{fa-icon "fa-camera"}}
{{fa-icon "camera"}}
```

[Complete list of Font Awesome icons](http://fortawesome.github.io/Font-Awesome/icons/)

You can also bind the icon name to a controller or model property:

```hbs
{{fa-icon iconName}}
{{fa-icon menu.copyIcon}}
```

if you know upfront that the icon will not change, you can use `unbound` to prevent a property binding from being created:

```hbs
{{!-- Static icon --}}
{{unbound fa-icon "camera"}}
{{!-- Icon initialized with, but not bound to, a property --}}
{{unbound fa-icon iconName}}
```

## Options

The [Font Awesome examples](http://fortawesome.github.io/Font-Awesome/examples/) illustrate the various options and their effects. It should be obvious how these options map to their `fa-icon` counterparts.

### Different icon sizes

```hbs
{{fa-icon "star" size="lg"}}
{{fa-icon "star" size=2}}
{{fa-icon "star" size=3}}
{{fa-icon "star" size=4}}
{{fa-icon "star" size=5}}
```

The old icon size syntax is deprecated, but still supported, as of v0.0.4.

### Rotate

```hbs
{{fa-icon "camera" rotate=90}}
{{fa-icon "camera" rotate=180}}
{{fa-icon "camera" rotate=270}}
```

### Flip

```hbs
{{fa-icon "bicycle" flip="horizontal"}}
{{fa-icon "car" flip="vertical"}}
```

### Spin

```hbs
{{!-- using a boolean literal --}}
{{fa-icon "refresh" spin=true}}
{{!-- or a property --}}
{{fa-icon "refresh" spin=isLoading}}
```

### Pulse (new in v0.1.0)

```hbs
{{fa-icon "spinner" pulse=true}}
```

### Inverse

```hbs
{{fa-icon "circle" inverse=true}}
```

### List icons

```hbs
<ul class="fa-ul">
  <li>
    {{fa-icon "star" listItem=true}} Item
  </li>
</ul>
```

### Fixed width icons

```hbs
<div class="list-group">
  <a class="list-group-item" href="#">
    {{fa-icon "home" fixedWidth=true}} Home
  </a>
  <a class="list-group-item" href="#">
    {{fa-icon "book" fixedWidth=true}} Library
  </a>
</div>
```

### Bordered & pulled icons

```hbs
<p>
{{fa-icon "quote-left" pull="left" border=true}}
...tomorrow we will run faster, stretch out our arms farther...
And then one fine morning— So we beat on, boats against the
current, borne back ceaselessly into the past.
</p>
```

### Stacked icons

```hbs
<span class="fa-stack fa-lg">
  {{fa-icon fa-square-o stack=2}}
  {{fa-icon fa-twitter stack=1}}
</span>
```

### aria-hidden attribute

To better support accessibility (i.e. screen readers), the helper now generates an `aria-hidden` attribute by default:

```hbs
{{fa-icon "star"}}
{{!-- results in: --}}
<i class="fa fa-star" aria-hidden="true"></i>
```

To remove the `aria-hidden` attribute:

```hbs
{{fa-icon "star" ariaHidden=false}}
{{!-- results in: --}}
<i class="fa fa-star"></i>
```

### Tag name

Use `tagName` to control the generated markup:

```hbs
{{fa-icon "star" tagName="span"}}
{{!-- results in: --}}
<span class="fa fa-star"></span>
```

### Custom class names

```hbs
{{fa-icon "bicycle" classNames="my-custom-class"}}
{{!-- results in: --}}
<i class="fa fa-bicycle my-custom-class"></i>
```

### Title attribute

```hbs
{{fa-icon "edit" title="Edit the item"}}
{{!-- results in: --}}
<i class="fa fa-edit" title="Edit the item"></i>
```

## License

[Public Domain](UNLICENSE)
