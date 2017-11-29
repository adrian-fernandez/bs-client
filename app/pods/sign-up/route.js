import Ember from 'ember';
import DS from 'ember-data';
import CurrentUser from 'bs-client/mixins/current-user';
import ErrorGenerator from 'bs-client/mixins/error-generator';

export default Ember.Route.extend(CurrentUser, ErrorGenerator, {
  beforeModel() {
    this.requireNotAuthenticated();
  },

  setupController(controller) {
    const user = this.store.createRecord('user', { } );

    controller.set('user', user);
  },

  actions: {
    signup() {
      const user = this.get('controller.user');

      var valid = (user) => {
        const email = user.get('email');
        const password = user.get('password');

        this.signIn(email, password);

        this.notifications.addNotification({
          message: this.get('intl').t('sign_up.created'),
          type: 'success',
          autoClear: true
        });
      };

      var invalid = (response) => {
        this.notifications.addNotification({
          message: this.generateErrors(response.errors),
          type: 'error',
          autoClear: true
        });
      };

      user.validate().then(() => {
        user.set('errors', new DS.Errors());
        user.save().then(valid, invalid);
      }).catch(() => {
        this.notifications.addNotification({
          message: this.generateErrors(user.get('errors')),
          type: 'error',
          autoClear: true
        });
      });
    }
  }
});
