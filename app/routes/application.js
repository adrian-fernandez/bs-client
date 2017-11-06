import Ember from 'ember';

export default Ember.Route.extend({
  intl: Ember.inject.service(),

  beforeModel() {
    const intl = this.get('intl');

    intl.setLocale(['en', 'es']);
  }
});
