import Ember from 'ember';
import ENV from 'bs-client/config/environment';

export default Ember.Component.extend({
  abc: Ember.computed(function(){
    return 'a ' + ENV.BACKEND_URL + ' b';
  }),

  actions: {
    authenticate() {
      this.sendAction('authenticate');
    }
  }
});
