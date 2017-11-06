import Ember from 'ember';
import DS from 'ember-data';
import ErrorGenerator from 'bs-client/mixins/error-generator';

export default Ember.Controller.extend(ErrorGenerator, {
  allUsersExceptMe: Ember.computed(function() {
    return this.get('store').query('user',
      {
        exclude_ids: this.get('currentUser.user.id'),
        exclude_role_ids: this.get('currentUser.user.role_id')
      }
    );
  }),

  actions: {
    save() {
      const rental = this.get('rental');

      var valid = () => {
        this.notifications.addNotification({
          message: this.get('intl').t('rental.messages.created'),
          type: 'success',
          autoClear: true
        });

        this.send('closeModal');
      };

      var invalid = (response) => {
        this.notifications.addNotification({
          message: this.generateErrors(response.errors),
          type: 'error',
          autoClear: true
        });
      };

      rental.validate().then(() => {
        rental.set('errors', new DS.Errors());
        rental.save().then(valid, invalid);
      }).catch(() => {
        this.notifications.addNotification({
          message: this.generateErrors(rental.get('errors')),
          type: 'error',
          autoClear: true
        });
      });
    },

    close() {
      this.send('closeModal');
    }
  }
});
