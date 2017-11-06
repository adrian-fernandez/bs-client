import Ember from 'ember';
import BookingActions from 'bs-client/mixins/booking-actions';

export default Ember.Route.extend(BookingActions, {
  model(params) {
    if (params.id) {
      return this.store.find('booking', params.id);
    } else {
      this.transitionTo(this.get('permissions').accessibleLink());
    }
  },

  setupController(controller, model) {
    controller.set('booking', model);
    controller.set('rental', model.get('rental'));
  },

  renderTemplate(controller) {
    this.render('bookings.new', { controller });
  }
});
