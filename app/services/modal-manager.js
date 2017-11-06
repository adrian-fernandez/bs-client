import Ember from 'ember';

export default Ember.Service.extend({
  route: Ember.computed(function() {
    return Ember.getOwner(this).lookup('route:application');
  }),

  controller: Ember.computed('route', function() {
    return this.get('route').controllerFor('modal');
  }),

  open(name, params) {
    const route = this.get('route');
    const controller = this.get('controller');
    const options = {
      into: 'application',
      outlet: 'modal',
      controller
    };

    controller.set('params', params);
    controller.set('componentName', name);

    this.set('controller', controller);

    route.render('modal', options);
  },

  close() {
    this.get('route').disconnectOutlet({
      outlet: 'modal',
      parentView: 'application'
    });
  }
});
