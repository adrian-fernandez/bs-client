import Ember from 'ember';
import BookingActions from 'bs-client/mixins/booking-actions';

export default Ember.Route.extend(BookingActions, {
  model() {
    const data = {};

    if (!this.get('currentUser.isAdmin')) {
      data.user = this.get('currentUser.user');
    }

    const hash = {
      booking: this.store.createRecord('booking', data)
    };

    return Ember.RSVP.hash(hash);
  },

  setupController(controller, model) {
    controller.setProperties(model);
  }
});
