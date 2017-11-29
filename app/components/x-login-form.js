import Ember from 'ember';
import ENV from 'bs-client/config/environment';

export default Ember.Component.extend({
  actions: {
    authenticate() {
      this.sendAction('authenticate');
    }
  }
});
