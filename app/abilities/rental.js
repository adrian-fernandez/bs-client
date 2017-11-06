import Ember from 'ember';
import GenericAbility from 'bs-client/abilities/generic';

export default GenericAbility.extend({
  canCreate: Ember.computed('currentUser', function() {
    return this.get('currentUser');
  }),

  canBook: Ember.computed('model.user', 'currentUser.isAdmin', function() {
    return !this.get('currentUser.isAdmin') &&
      this.get('model.user.id') !== this.get('currentUser.user.id');
  }),

  canChangeUser: Ember.computed('currentUser.isAdmin', function() {
    return this.get('currentUser.isAdmin');
  })
});
