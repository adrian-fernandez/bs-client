import Ember from 'ember';

export default Ember.Service.extend({
  currentUser: Ember.inject.service('current-user'),

  accessibleLink() {
    if (!this.get('currentUser')) {
      return 'landing';
    }

    if (this.get('currentUser.admin')) {
      return 'rentals';
    } else {
      return 'rentals';
    }
  }
});
