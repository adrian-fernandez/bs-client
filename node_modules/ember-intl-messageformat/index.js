/* jshint node: true */
'use strict';

const path = require('path');
const mergeTrees = require('broccoli-merge-trees');
const UnwatchedDir = require('broccoli-source').UnwatchedDir;

const messageFormatPath = path.dirname(require.resolve('intl-messageformat'));

module.exports = {
  name: 'intl-messageformat',

  treeForAddon(tree) {
    let messageFormatParserTree = new UnwatchedDir(path.join(messageFormatPath, 'src'));
    let addonTree = mergeTrees([messageFormatParserTree, tree], { overwrite: true });

    return this._super.treeForAddon.call(this, addonTree);
  }
};
