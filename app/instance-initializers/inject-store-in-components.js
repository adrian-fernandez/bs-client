export default {
  name: 'injectStoreIntoComponent',
  after: 'ember-data',

  initialize (application) {
    application.inject('component', 'store', 'service:store');
  }
};
