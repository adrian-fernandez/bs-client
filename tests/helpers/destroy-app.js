import Ember from 'ember';

export default Ember.Helper.helper(function destroyApp(application) {
  Ember.run(application, 'destroy');
  if (window.server) {
    window.server.shutdown();
  }
});
