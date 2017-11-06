import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    closeModal() {
      this.transitionTo('bookings');
    }
  }
});
