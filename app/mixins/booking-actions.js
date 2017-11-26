import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    closeModal(from = 'bookings') {
      if (from === 'bookings') {
        this.transitionTo('bookings');
      } else {
        this.transitionTo('rentals');
      }
    }
  }
});
