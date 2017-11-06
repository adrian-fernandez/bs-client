import Ember from 'ember';
import RouteError from 'bs-client/mixins/route-error';

export default Ember.Route.extend(RouteError, {
  intl: Ember.inject.service(),
  currentUser: Ember.inject.service(),

  beforeModel() {
    this.get('intl').setLocale('en');
    this.get('currentUser').load();
  },

  actions: {
    doNotRenderLayout() {
      const controller = this.controllerFor('application');
      controller.set('renderLayout', false);
    },

    doRenderLayout(){
      const controller = this.controllerFor('application');
      controller.set('renderLayout', true);
    },

    openModal(name, controller) {
      controller = controller && typeof(controller) !== 'string'
        ? controller
        : this.controllerFor(controller || name);

      const options = {
        into: 'application',
        outlet: 'modal',
        controller
      };

      this.render(name, options);
    },

    closeModal() {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
});
