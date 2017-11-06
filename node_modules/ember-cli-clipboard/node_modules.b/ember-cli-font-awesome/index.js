/* jshint node: true */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-cli-font-awesome',

  included: function(app, parentAddon) {
    this._super.included(app);

    var target = (parentAddon || app);
    var options = target.options.emberCliFontAwesome || {};

    if (!('includeFontAwesomeAssets' in options)) {
      options.includeFontAwesomeAssets = true;
    }

    if (options.includeFontAwesomeAssets) {
      if (!options.useScss) {
        target.import(target.bowerDirectory + "/font-awesome/css/font-awesome.css");
      }

      target.import(target.bowerDirectory + "/font-awesome/fonts/fontawesome-webfont.eot", { destDir: "fonts" });
      target.import(target.bowerDirectory + "/font-awesome/fonts/fontawesome-webfont.svg", { destDir: "fonts" });
      target.import(target.bowerDirectory + "/font-awesome/fonts/fontawesome-webfont.ttf", { destDir: "fonts" });
      target.import(target.bowerDirectory + "/font-awesome/fonts/fontawesome-webfont.woff", { destDir: "fonts" });
      target.import(target.bowerDirectory + "/font-awesome/fonts/fontawesome-webfont.woff2", { destDir: "fonts" });
      target.import(target.bowerDirectory + "/font-awesome/fonts/FontAwesome.otf", { destDir: "fonts" });
    }
  },

  treeForStyles: function() {
    var fontAwesomePath = path.join(this.app.bowerDirectory, 'font-awesome');
    var fontAwesomeTree = new Funnel(this.treeGenerator(fontAwesomePath), {
      srcDir: '/scss',
      destDir: '/app/styles/font-awesome'
    });

    return fontAwesomeTree;
  }
};
