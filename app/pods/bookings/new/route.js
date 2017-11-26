import Ember from 'ember';
import BookingActions from 'bs-client/mixins/booking-actions';

export default Ember.Route.extend(BookingActions, {
  model(params) {
    const data = { rentalId: params.rental_id };

    if (!this.get('currentUser.isAdmin')) {
      data.user = this.get('currentUser.user');
    }

    const rental = this.store.findRecord('rental', params.rental_id);
    data.rental = rental;

    const hash = {
      rental,
      booking: this.store.createRecord('booking', data)
    };

    return Ember.RSVP.hash(hash);
  },

  setupController(controller, model) {
    controller.setProperties(model);
  }
});
