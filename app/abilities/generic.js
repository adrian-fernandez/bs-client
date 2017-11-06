import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: Ember.inject.service(),
  currentUser: Ember.inject.service(),

  canCreate: Ember.computed('currentUser', function() {
    return this.get('currentUser') &&
      this.get('currentUser.isAdmin');
  }),

  canSave: Ember.computed('currentUser.{id,isAdmin}', 'model.user_id', function() {
    return this.get('currentUser.isAdmin') ||
      this.get('currentUser.id') === this.get('model.user_id');
  }),

  canDelete: Ember.computed('model.user', 'currentUser.isAdmin', function() {
    return this.get('currentUser.isAdmin') ||
      this.get('model.user.id') === this.get('currentUser.user.id');
  }),

  canEdit: Ember.computed('model.user', 'currentUser.isAdmin', function() {
    return this.get('currentUser.isAdmin') ||
      this.get('model.user.id') === this.get('currentUser.user.id');
  })
});
