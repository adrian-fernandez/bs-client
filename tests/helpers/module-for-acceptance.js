import { module } from 'qunit';
import Ember from 'ember';
import startApp from '../helpers/start-app';

export default function(name, options = {}) {
  module(name, {
    beforeEach() {
      this.application = startApp();

      if (options.beforeEach) {
        return options.beforeEach.apply(this, arguments);
      }
    },

    afterEach() {
      Ember.run(this.application, 'destroy');
      if (window.server) {
        window.server.shutdown();
      }
    }
  });
}
