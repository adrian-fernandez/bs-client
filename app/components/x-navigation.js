import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',

  session: Ember.inject.service(),
  currentUser: Ember.inject.service(),

  isLoggedIn: Ember.computed.oneWay('session.isAuthenticated'),

  userEmail: Ember.computed('currentUser.email', function() {
    return this.get('currentUser.email');
  }),

  actions: {
    invalidateSession() {
      this.attrs.invalidateSession();
    }
  }
});
