import Ember from 'ember';

const FA_PREFIX = /^fa\-.+/;

const warn = Ember.Logger.warn;
const { typeOf, isArray } = Ember;

/**
 * Handlebars helper for generating HTML that renders a FontAwesome icon.
 *
 * @param  {String} name   The icon name. Note that the `fa-` prefix is optional.
 *                         For example, you can pass in either `fa-camera` or just `camera`.
 * @param  {Object} params Options passed to helper.
 * @return {Ember.Handlebars.SafeString} The HTML markup.
 */
const faIcon = function faIcon(name, {
  classNames,
  tagName,
  ariaHidden,
  title,
  spin,
  pulse,
  flip,
  rotate,
  lg,
  x,
  size,
  fixedWidth,
  listItem,
  border,
  pull,
  stack,
  inverse
} = {}) {
  if (typeOf(name) !== 'string') {
    const message = "fa-icon: no icon specified";
    warn(message);
    return Ember.String.htmlSafe(message);
  }

  if (classNames === undefined) {
    classNames = [];
  }

  if (!isArray(classNames)) {
    classNames = [ classNames ];
  }

  classNames.push("fa");

  if (!name.match(FA_PREFIX)) {
    name = `fa-${name}`;
  }

  classNames.push(name);

  if (spin) {
    classNames.push("fa-spin");
  }

  if (pulse) {
    classNames.push("fa-pulse");
  }

  if (flip) {
    classNames.push(`fa-flip-${flip}`);
  }

  if (rotate) {
    classNames.push(`fa-rotate-${rotate}`);
  }

  if (lg) {
    warn(`fa-icon: the 'lg' parameter is deprecated. Use 'size' instead. I.e. {{fa-icon size="lg"}}`);
    classNames.push("fa-lg");
  }

  if (x) {
    warn(`fa-icon: the 'x' parameter is deprecated. Use 'size' instead. I.e. {{fa-icon size="${x}"}}`);
    classNames.push(`fa-${x}x`);
  }

  if (size) {
    if (typeOf(size) === "string" && size.match(/^\d+$/)) {
      size = Number(size);
    }

    if (typeOf(size) === "number") {
      classNames.push(`fa-${size}x`);
    } else {
      classNames.push(`fa-${size}`);
    }
  }

  if (fixedWidth) {
    classNames.push("fa-fw");
  }

  if (listItem) {
    classNames.push("fa-li");
  }

  if (pull) {
    classNames.push("pull-" + pull);
  }

  if (border) {
    classNames.push("fa-border");
  }

  if (stack) {
    if (typeOf(stack) === "string" && stack.match(/^\d+$/)) {
      size = Number(stack);
    }

    if (typeOf(stack) === "number") {
      classNames.push(`fa-stack-${stack}x`);
    } else {
      classNames.push(`fa-stack-${stack}`);
    }
  }

  if (inverse) {
    classNames.push("fa-inverse");
  }

  const showAriaHidden = ariaHidden === undefined || ariaHidden;

  tagName = tagName || 'i';

  const htmlClass      = `class="${classNames.join(" ")}"`;
  const htmlTitle      = title ? `title="${title}"` : "";
  const htmlAriaHidden = showAriaHidden ? `aria-hidden="true"` : "";

  const html =
    `<${tagName} ${htmlClass} ${htmlTitle} ${htmlAriaHidden}></${tagName}>`;

  // removes extra whitespaces
  return html.replace(/\s+/g, " ");
};

export { faIcon }; // jshint ignore:line
export default Ember.Helper.helper(function faIconHelper([name], params) {
  return Ember.String.htmlSafe(faIcon(name, params));
});
