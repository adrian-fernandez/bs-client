import Ember from 'ember';
import RentalActions from 'bs-client/mixins/rental-actions';

export default Ember.Route.extend(RentalActions, {
  model(params) {
    if (params.id) {
      return this.store.find('rental', params.id);
    } else {
      this.transitionTo(this.get('permissions').accessibleLink());
    }
  },

  setupController(controller, model) {
    controller.set('rental', model);
  },

  renderTemplate(controller) {
    this.render('rentals.new', { controller });
  }
});
