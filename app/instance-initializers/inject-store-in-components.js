export default {
  name: 'injectStoreIntoComponent',
  after: 'ember-data',

  initialize: function (application) {
    application.inject('component', 'store', 'service:store');
  }
};
