import Ember from 'ember';
import RentalActions from 'bs-client/mixins/rental-actions';

export default Ember.Route.extend(RentalActions, {
  model() {
    const data = {};

    if (!this.get('currentUser.isAdmin')) {
      data.user = this.get('currentUser.user');
    }

    const hash = {
      rental: this.store.createRecord('rental', data)
    };

    return Ember.RSVP.hash(hash);
  },

  setupController(controller, model) {
    controller.setProperties(model);
  }
});
