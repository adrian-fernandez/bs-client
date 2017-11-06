import Ember from 'ember';
import GenericAbility from 'bs-client/abilities/generic';

export default GenericAbility.extend({
  canChangeUser: Ember.computed('currentUser.isAdmin', function() {
    return this.get('currentUser.isAdmin');
  }),

  canDelete: Ember.computed('model.hasStarted', function() {
    return !this.get('model.hasStarted') &&
      this._super();
  }),

  canEdit: Ember.computed('model.hasStarted', function() {
    return !this.get('model.hasStarted') &&
      this._super();
  }),

  canSeeUser: Ember.computed('currentUser.isAdmin', function() {
    return this.get('currentUser.isAdmin');
  })
});
