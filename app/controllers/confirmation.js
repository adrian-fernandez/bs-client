import Ember from 'ember';

export default Ember.Controller.extend({
  modalManager: Ember.inject.service(),

  requestDeferred: null,
  titleText: null,
  bodyText: null,
  submitButtonText: null,
  submitDisabled: false,
  isWarning: false,
  cancelOnly: false,

  openModal() {
    this.get('target').send('openModal', 'confirmation', this);
    this.requestDeferred = Ember.RSVP.defer();
    return this.requestDeferred.promise;
  },

  actions: {
    cancel() {
      this.get('target').send('closeModal');
      this.requestDeferred.resolve(false);
    },

    submit() {
      this.get('target').send('closeModal');
      this.requestDeferred.resolve(true);
    }
  }
});
