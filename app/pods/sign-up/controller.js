import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['invite_key'],
  actions: {
    toggleTerms: () => {
      this.toggleProperty('showTermsModal');
    },

    togglePrivacyPolicy: () => {
      this.toggleProperty('showPrivacyPolicyModal');
    }
  }
});
