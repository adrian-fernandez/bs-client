import Ember from 'ember';
import CurrentUser from 'bs-client/mixins/current-user';

export default Ember.Route.extend(CurrentUser, {
  beforeModel: (transition) => {
    const notAuthed = function() {
      const message = transition.queryParams.message;
      if (message) {
        this.get('notifications').addNotification({
          message,
          type: 'error',
          autoClear: true
        });
      }
      this.transitionTo('landing');
    }.bind(this);

    this.requireNotAuthenticated(notAuthed);
  }
});
