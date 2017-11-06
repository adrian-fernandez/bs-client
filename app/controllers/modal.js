import Ember from 'ember';

export default Ember.Controller.extend(Ember.Evented, {
  modalManager: Ember.inject.service(),

  actions: {
    close() {
      this.get('modalManager').close();
    }
  }
});
