import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
const { RSVP } = Ember;

export default Base.extend({
  restore(data) {
    return new RSVP.Promise((resolve, reject) => {
      if (!isEmpty(data) && !isEmpty(data.user)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate(token) {
    const url = '/api/v1/user_sessions/token';

    return Ember.$.ajax({
      url,
      type: 'POST',
      data: {
        token
      }
    });
  }
});
