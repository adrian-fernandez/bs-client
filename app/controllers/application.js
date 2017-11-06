import Ember from 'ember';
import CurrentUser from 'bs-client/mixins/current-user';

export default Ember.Controller.extend(CurrentUser, {
  session: Ember.inject.service('session'),

  renderLayout: true,

  actions: {
    invalidateSession() {
      this.signOut();
    }
  }
});
